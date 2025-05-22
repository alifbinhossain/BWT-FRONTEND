import {
	IApplyLeaveLogTableData,
	IEmployeeTableData,
	ILateApprovalTableData,
	IManualEntryLogTableData,
	IPunchLogTableData,
} from '@/pages/hr/_config/columns/columns.type';
import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

export const employeeColumns = (): ColumnDef<IEmployeeTableData>[] => [
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'employee_id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: ({ cell, row }) => (
			<div>
				<p>{cell.getValue<string>() || 'N/A'}</p>
				<span>
					{row.original.designation_name && row.original.designation_name + ', '}
					{row.original.department_name && row.original.department_name}
				</span>
			</div>
		),
	},

	{
		accessorKey: 'shift_group_name',
		header: 'Shift Group',
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
	},
	{
		accessorKey: 'workplace_name',
		header: 'Workplace',
	},
];

export const punchLogColumns = (): ColumnDef<IPunchLogTableData>[] => [
	{
		accessorKey: 'employee_id',
		header: 'ID',
	},
	{
		accessorKey: 'employee_name',
		header: 'Employee Name',
	},
	{
		accessorKey: 'device_list_name',
		header: 'Device Name',
	},
	{
		accessorKey: 'punch_type',
		header: 'Punch Type',
	},
	{
		accessorKey: 'punch_time',
		header: 'Punch Time',
	},
];

export const applyLeaveLogColumns = (): ColumnDef<IApplyLeaveLogTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee Name',
	},
	{
		accessorKey: 'leave_category_name',
		header: 'Leave Category',
	},
	{
		accessorKey: 'year',
		header: 'Year',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
	{
		accessorKey: 'from_date',
		header: 'From Date',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'to_date',
		header: 'To Date',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'file',
		header: 'File',
	},
	{
		accessorKey: 'approved',
		header: 'Approved',
	},
];

export const manualEntryLogColumns = (): ColumnDef<IManualEntryLogTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee Name',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'area',
		header: 'Area',
	},
	{
		accessorKey: 'device_list_name',
		header: 'Device',
	},
	{
		accessorKey: 'approved',
		header: 'Approved',
	},
];

export const lateApprovalLogColumns = (): ColumnDef<ILateApprovalTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee Name',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'approved',
		header: 'Approved',
	},
];