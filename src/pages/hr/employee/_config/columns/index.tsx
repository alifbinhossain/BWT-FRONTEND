import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { IEmployeeTableData } from './columns.type';

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
		accessorKey: 'employment_type_uuid',
		header: 'Employment Type',
	},
	{
		accessorKey: 'workplace_name',
		header: 'Workplace',
	},
];
