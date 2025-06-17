import { IManualEntryTableData } from '@/pages/hr/_config/columns/columns.type';
import { IStatus } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';
import StatusBadge from '@/components/ui/status-badge';
import TimeDifference from '@/components/ui/time-difference';

import { IPunchLogsPerDayTableData } from './columns.type';

// Field Visit Columns
export const fieldVisitColumns = (): ColumnDef<IManualEntryTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusBadge status={info.getValue<string>() as IStatus} />;
		},
	},
];
// Punch Log Per Day Columns
export const punchLogPerDayColumns = (): ColumnDef<IPunchLogsPerDayTableData>[] => [
	{
		accessorKey: 'punch_date',
		header: 'Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} onlyTime />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} onlyTime />,
	},
	{
		accessorKey: 'duration_hours',
		header: 'Hours',
		enableColumnFilter: false,
		cell: ({ row }) => <TimeDifference earlierDate={row.original.entry_time} laterDate={row.original.exit_time} />,
	},
];

// Manual Entry Columns
export const manualEntryColumns = (): ColumnDef<IManualEntryTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusBadge status={info.getValue<string>() as IStatus} />;
		},
	},
];
