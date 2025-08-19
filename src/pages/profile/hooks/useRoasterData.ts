import { useHRRoasterByEmployeeUUID } from '@/pages/profile/config/query';
import { format, getDaysInMonth, isBefore, isSameDay, parseISO } from 'date-fns';
import useAuth from '@/hooks/useAuth';

import { RosterData, TimeDetails } from '../utils';

export const useRosterData = (month: number, year: number) => {
	const { user } = useAuth();
	const { data } = useHRRoasterByEmployeeUUID<RosterData>(user?.employee_uuid as string, month + 1, year);

	const currentDate = new Date(year, month);
	const daysOfMonth = getDaysInMonth(currentDate);

	// Format a safe date string dd/MM/yyyy
	const createSafeDate = (day: number): string => {
		const date = new Date(year, month, day);
		return format(date, 'dd/MM/yyyy');
	};

	// Check if a date is a holiday based on database data
	const checkHoliday = (
		day: number
	): {
		isHoliday: boolean;
		holidayType?: 'special' | 'general';
		holidayName?: string;
	} => {
		const dayDate = new Date(year, month, day);
		const dateString = format(dayDate, 'yyyy-MM-dd');

		// Check special holidays from database
		if (data?.special_holidays?.length) {
			const specialHoliday = data.special_holidays.find((h) => {
				// Compare with holiday_date field
				const holidayDate = h.holiday_date && format(h.holiday_date, 'yyyy-MM-dd');
				return holidayDate === dateString;
			});

			if (specialHoliday) {
				return {
					isHoliday: true,
					holidayType: 'special',
					holidayName: specialHoliday.name,
				};
			}
		}

		// Check general holidays from database
		if (data?.general_holidays?.length) {
			const generalHoliday = data.general_holidays.find((h) => {
				// Extract date from datetime string "2025-08-05 00:00:00"
				const holidayDate = format(parseISO(h.date), 'yyyy-MM-dd');
				return holidayDate === dateString;
			});

			if (generalHoliday) {
				return {
					isHoliday: true,
					holidayType: 'general',
					holidayName: generalHoliday.name,
				};
			}
		}

		return { isHoliday: false };
	};

	// Determine shift, timing, and group name for a given day
	const getShiftForDay = (day: number): Omit<TimeDetails, 'date'> => {
		// Check for holidays first (highest priority)
		const holidayCheck = checkHoliday(day);

		if (holidayCheck.isHoliday) {
			return {
				shift: holidayCheck.holidayName || 'Holiday',
				timing: '-',
				shiftGroupName: holidayCheck.holidayName || 'Holiday',
				holidayType: holidayCheck.holidayType,
			};
		}

		// Fallback defaults for regular days
		const defaultResult = {
			shift: 'Morning',
			timing: '08:00 AM - 04:00 PM',
			shiftGroupName: 'Default Group',
			holidayType: undefined,
		};

		if (!data?.roster?.length || !data.roster[0]?.shift_group?.length) {
			return defaultResult;
		}

		const dayDate = new Date(year, month, day);

		// Find all shift groups effective on or before this day
		const applicable = data.roster[0].shift_group
			.filter((sg) => {
				const eff = sg.effective_date;
				return isBefore(eff, dayDate) || isSameDay(eff, dayDate);
			})
			// Sort descending by effective_date, then by created_at to get the latest
			.sort((a, b) => {
				const dateA = new Date(a.effective_date).getTime();
				const dateB = new Date(b.effective_date).getTime();

				// If effective dates are same, sort by created_at (latest first)
				if (dateA === dateB) {
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				}

				return dateB - dateA;
			})[0];

		if (!applicable) {
			return defaultResult;
		}

		// Map date to weekday key used in off_days
		const dayKey = format(dayDate, 'eee').toLowerCase();

		// If this weekday is in off_days, mark as off
		if (applicable.off_days.includes(dayKey)) {
			return {
				shift: 'Off Day',
				timing: '-',
				shiftGroupName: applicable.shift_group_name,
				holidayType: undefined,
			};
		}

		// Otherwise, morning shift
		return {
			shift: applicable.shift_group_name,
			timing: '08:00 AM - 04:00 PM',
			shiftGroupName: applicable.shift_group_name,
			holidayType: undefined,
		};
	};

	// Generate three tables splitting the month into thirds
	const generateTableData = () => {
		const firstDataTable: TimeDetails[] = [];
		const secondDataTable: TimeDetails[] = [];
		const thirdDataTable: TimeDetails[] = [];
		const thirdSize = Math.floor(daysOfMonth / 3);

		// First third
		for (let i = 1; i <= thirdSize; i++) {
			firstDataTable.push({
				date: createSafeDate(i),
				...getShiftForDay(i),
			});
		}

		// Second third
		for (let i = thirdSize + 1; i <= thirdSize * 2; i++) {
			secondDataTable.push({
				date: createSafeDate(i),
				...getShiftForDay(i),
			});
		}

		// Third third (includes remainder)
		for (let i = thirdSize * 2 + 1; i <= daysOfMonth; i++) {
			thirdDataTable.push({
				date: createSafeDate(i),
				...getShiftForDay(i),
			});
		}

		return { firstDataTable, secondDataTable, thirdDataTable };
	};

	return {
		data,
		daysOfMonth,
		tableData: generateTableData(),
	};
};
