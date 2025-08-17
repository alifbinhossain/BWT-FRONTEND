import { Column } from '@/lib/component/type';

export const ROSTER_TABLE_COLUMNS: Column[] = [
	{
		accessoriesKey: 'date',
		header: 'Date',
		type: 'text',
	},
	{
		accessoriesKey: 'shift',
		header: 'Shift',
		type: 'text',
	},
	{
		accessoriesKey: 'timing',
		header: 'Timing',
		type: 'text',
	},
];
