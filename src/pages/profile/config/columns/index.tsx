import { IProcessTableData } from '@/pages/work/_config/columns/columns.type';
import { ColumnDef, Row } from '@tanstack/react-table';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { IDepartmentTableData, IDesignationTableData, IInfoTableData, IUserTableData } from './columns.type';

// Department Columns
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Designation Columns
export const designationColumns = (): ColumnDef<IDesignationTableData>[] => [
	{
		accessorKey: 'designation',
		header: 'Designation',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// User Columns
export function userColumns({
	pageAssignAccess,
	resetPasswordAccess,
	statusAccess,
	handleStatus,
	handleResetPassword,
	handlePageAssign,
}: {
	statusAccess: boolean;
	resetPasswordAccess: boolean;
	pageAssignAccess: boolean;
	handleStatus: (row: Row<any>) => void;
	handleResetPassword: (row: Row<any>) => void;
	handlePageAssign: (row: Row<any>) => void;
}): ColumnDef<IUserTableData>[] {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => {
				return (
					<Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />
				);
			},
			size: 40,
			meta: {
				hidden: !statusAccess,
			},
		},
		{
			accessorKey: 'user_type',
			header: 'Type',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'phone',
			header: 'Phone',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'department',
			header: 'Department',
			enableColumnFilter: false,
			cell: (info) => {
				const { department, designation } = info.row.original;

				return (
					<div className='flex flex-col'>
						<span className='capitalize'>{department}</span>
						<span className='text-xs capitalize text-gray-400'>{designation}</span>
					</div>
				);
			},
		},

		{
			accessorKey: 'reset_pass_actions',
			id: 'reset_pass_actions',
			header: () => (
				<span>
					Reset <br />
					Password
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <ResetPassword onClick={() => handleResetPassword(info.row)} />,
			size: 40,
			meta: {
				hidden: !resetPasswordAccess,
				disableFullFilter: true,
			},
		},

		{
			accessorKey: 'page_assign_actions',
			id: 'page_assign_actions',
			header: () => (
				<span>
					Page <br />
					Assign
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <PageAssign onClick={() => handlePageAssign(info.row)} />,
			size: 40,
			meta: {
				hidden: !pageAssignAccess,
				disableFullFilter: true,
			},
		},
	];
}
//* Info Columns
export const infoColumns = (): ColumnDef<IInfoTableData>[] => [
	{
		accessorKey: 'info_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/work/order/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'user_name',
		header: 'Customer',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_product_received',
		header: 'Product Received',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'received_date',
		header: 'Receive Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
//*Process Columns
export const processColumns = (): ColumnDef<IProcessTableData>[] => [
	{
		accessorKey: 'section_name',
		header: 'Section',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Process Status',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<>
					<StatusButton value={info.getValue() as boolean} />
					{info.row.original.status_update_date ? (
						<DateTime date={new Date(info.row.original.status_update_date)} isTime={false} />
					) : (
						''
					)}
				</>
			);
		},
	},
];
