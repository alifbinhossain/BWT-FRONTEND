import { ColumnDef } from '@tanstack/react-table';

import Profile from '@/components/others/profile';
import DateTime from '@/components/ui/date-time';

import { IFieldVisitTableData } from './columns.type';

// * Flied Visit Columns
export const filedVisitColumns = (): ColumnDef<IFieldVisitTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		size: 250,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<Profile
					data={{
						name: info.row.original.employee_name,
						department_name: info.row.original.department_name,
						designation_name: info.row.original.designation_name,
					}}
					url={`/profile/${info.row.original.employee_uuid}`}
				/>
			);
		},
	},
	{
		accessorKey: 'applied_date',
		header: 'Date',
		enableColumnFilter: false,
		
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry',
		enableColumnFilter: false,
		
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit',
		enableColumnFilter: false,
		
	},
	{
		accessorKey: 'first_approver_name',
		header: 'Approver',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'applied_by_name',
		header: 'Applied By',
		enableColumnFilter: false,
	},
];
