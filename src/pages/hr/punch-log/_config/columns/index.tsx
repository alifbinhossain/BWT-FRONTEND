import { IEmployeeTableData, IPunchLogTableData } from '@/pages/hr/_config/columns/columns.type';
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
		accessorKey: 'punch_time',
		header: 'Date',
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'punch_time',
		header: 'Punch Time',
		cell: (info) => <DateTime date={info.getValue() as Date} onlyTime />,
	},
	{
		accessorKey: 'device_list_name',
		header: 'Device Name',
	},
	{
		accessorKey: 'punch_type',
		header: 'Punch Type',
	},
];
