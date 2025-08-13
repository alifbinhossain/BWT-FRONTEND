import { Column } from '@/lib/component/type';

export interface TimeDetails {
	date: string;
	shift: string;
	timing: string;
	shiftGroupName: string;
	holidayType: 'special' | 'general' | undefined;
}

// Interface for special holidays from database
export interface SpecialHoliday {
	holiday_date: string;
	name: string;
	from_date: string;
	to_date: string;
}

// Interface for general holidays from database
export interface GeneralHoliday {
	date: string;
	name: string;
}

// Interface for roster data structure
export interface RosterData {
	roster: Array<{
		employee_uuid: string;
		employee_name: string;
		shift_group: Array<{
			off_days: string[];
			created_at: string;
			effective_date: string;
			shift_group_name: string;
			shift_group_uuid: string;
		}>;
		applied_leaves: any;
	}>;
	special_holidays: SpecialHoliday[];
	general_holidays: GeneralHoliday[];
}

export const ROSTER_TABLE_COLUMNS: Column[] = [
	{
		accessoriesKey: 'date',
		header: 'Date',
		type: 'text',
		className: (row: TimeDetails) => {
			if (row.holidayType === 'special' || row.shift === 'Off Day' || row.holidayType === 'general') {
				return 'bg-red-100 text-red-500 font-semibold';
			}
			return '';
		},
	},
	{
		accessoriesKey: 'shift',
		header: 'Shift',
		type: 'text',
		className: (row: TimeDetails) => {
			if (row.holidayType === 'special' || row.shift === 'Off Day' || row.holidayType === 'general') {
				return 'bg-red-100 text-red-500 font-semibold';
			}
			return '';
		},
	},
	{
		accessoriesKey: 'timing',
		header: 'Timing',
		type: 'text',
		className: (row: TimeDetails) => {
			if (row.holidayType === 'special' || row.shift === 'Off Day' || row.holidayType === 'general') {
				return 'bg-red-100 text-red-500 font-semibold';
			}
			return '';
		},
	},
];
