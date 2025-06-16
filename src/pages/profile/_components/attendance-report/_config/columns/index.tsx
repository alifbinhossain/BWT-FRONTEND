import { IEmployeeTableData, IManualEntryTableData } from '@/pages/hr/_config/columns/columns.type';
import { IProcessTableData } from '@/pages/work/_config/columns/columns.type';
import { IStatus } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import StatusButton from '@/components/buttons/status';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';

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
