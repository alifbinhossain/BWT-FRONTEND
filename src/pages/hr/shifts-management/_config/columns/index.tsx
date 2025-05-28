import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IRoasterColumnsType, IShiftsColumnsType, IShiftsGroupColumnsType } from './columns.type';

//* policy
export const shiftsColumns = (): ColumnDef<IShiftsColumnsType>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'start_time',
		header: 'Start Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'end_time',
		header: 'End Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'late_time',
		header: 'Late Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'early_exit_before',
		header: () => (
			<div>
				Early Exit <br />
				Before
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'first_half_end',
		header: () => (
			<div>
				First Half <br />
				End
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'break_time_end',
		header: () => (
			<div>
				Break Time <br />
				End
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isDate={false} />,
		size: 10,
	},
	{
		accessorKey: 'default_shift',
		header: 'Default Shift',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
		size: 10,
	},
	{
		accessorKey: 'color',
		header: 'Color',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
		size: 10,
	},
];

//*Shifts Group
export const shiftsGroupColumns = (): ColumnDef<IShiftsGroupColumnsType>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'shifts_name',
		header: 'Shifts',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'default_shift',
		header: 'Default Shift',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
		size: 10,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
		size: 10,
	},
	{
		accessorKey: 'effective_date',
		header: 'Effective Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as string} isTime={false} />,
		size: 10,
	},
	{
		accessorKey: 'off_days',
		header: 'Off Days',
		enableColumnFilter: false,
		cell: (info) => (info.getValue() as string[]).join(', '),
		size: 40,
	},
];
//*Roaster
export const roasterColumns = (): ColumnDef<IRoasterColumnsType>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'shift_name',
		header: 'Shift',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'shift_group_name',
		header: 'Shift Group',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
