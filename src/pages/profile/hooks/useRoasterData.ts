import { useHRRoasterByEmployeeUUID } from '@/pages/profile/config/query';
import { format, getDaysInMonth, isValid } from 'date-fns';
import useAuth from '@/hooks/useAuth';

export interface TimeDetails {
	date: string;
	shift: string;
	timing: string;
}

export const useRosterData = (month: number, year: number) => {
	const { user } = useAuth();
	const { data } = useHRRoasterByEmployeeUUID(user?.employee_uuid as string, month + 1, year);

	const currentDate = new Date(year, month);
	const daysOfMonth = getDaysInMonth(currentDate);

	const createSafeDate = (day: number): string => {
		const date = new Date(year, month, day);
		if (!isValid(date)) {
			console.error('Invalid date for day:', day, year, month);
			return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
		}
		return format(date, 'dd/MM/yyyy');
	};

	const generateTableData = (): {
		firstDataTable: TimeDetails[];
		secondDataTable: TimeDetails[];
		thirdDataTable: TimeDetails[];
	} => {
		const firstDataTable: TimeDetails[] = [];
		const secondDataTable: TimeDetails[] = [];
		const thirdDataTable: TimeDetails[] = [];

		const thirdSize = Math.floor(daysOfMonth / 3);
		const remainder = daysOfMonth % 3;

		// First third
		for (let i = 0; i < thirdSize; i++) {
			firstDataTable.push({
				date: createSafeDate(i + 1),
				shift: 'Morning',
				timing: '08:00 AM - 04:00 PM',
			});
		}

		// Second third
		for (let i = thirdSize; i < thirdSize * 2; i++) {
			secondDataTable.push({
				date: createSafeDate(i + 1),
				shift: 'Morning',
				timing: '08:00 AM - 04:00 PM',
			});
		}

		// Third third (includes remainder)
		for (let i = thirdSize * 2; i < daysOfMonth; i++) {
			thirdDataTable.push({
				date: createSafeDate(i + 1),
				shift: 'Morning',
				timing: '08:00 AM - 04:00 PM',
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
