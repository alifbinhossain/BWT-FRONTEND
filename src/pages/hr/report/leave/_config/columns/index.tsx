import { IStatus } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import StatusButton from '@/components/buttons/status';
import Profile from '@/components/others/profile';
import { Button } from '@/components/ui/button';
import DateTime from '@/components/ui/date-time';
import ReactSelect from '@/components/ui/react-select';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';

import EmployeeProfile from '@/lib/component/profile';
import { cn } from '@/lib/utils';

import { IHistoryTableData, ILeaveBalance } from './columns.type';

//* Leave History
export const reportLeaveHistory = (): ColumnDef<IHistoryTableData>[] => [
	{
		accessorKey: 'employee_id',
		header: 'Employee ID',
		enableColumnFilter: false,
	},
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
						department_name: info.row.original.employee_department,
						designation_name: info.row.original.employee_designation,
					}}
					url={`/profile/${info.row.original.employee_uuid}`}
				/>
			);
		},
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'leave_policy_name',
		header: 'Policy',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'leave_category_name',
		header: 'Category',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'from_date',
		header: 'From',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'to_date',
		header: 'To',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},

	{
		accessorKey: 'days',
		header: 'Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusBadge status={info.getValue<string>() as IStatus} />;
		},
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		enableColumnFilter: false,
	},
];
//* Leave Balance
export const leaveBalance = (): ColumnDef<ILeaveBalance>[] => [
	{
		accessorKey: 'employee_id',
		header: 'Employee ID',
		enableColumnFilter: false,
	},
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
						department_name: info.row.original.employee_department,
						designation_name: info.row.original.employee_designation,
					}}
					url={`/profile/${info.row.original.employee_uuid}`}
				/>
			);
		},
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'leave_policy_name',
		header: 'Policy',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => row.leave_categories.map((leaveCategory) => leaveCategory.leave_category_name),
		header: 'Category',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.leave_categories.map((leaveCategory) => (
						<span className='w-full'>{leaveCategory.leave_category_name}</span>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.leave_categories.map((leaveCategory) => leaveCategory.allowed_leaves),
		header: 'Entitled',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.leave_categories.map((leaveCategory) => (
						<span className='w-full'>{leaveCategory.allowed_leaves}</span>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.leave_categories.map((leaveCategory) => leaveCategory.used_days),
		header: 'Used',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.leave_categories.map((leaveCategory) => (
						<span className='w-full'>{leaveCategory.used_days}</span>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.leave_categories.map((leaveCategory) => leaveCategory.remaining_days),
		header: 'Remaining',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.leave_categories.map((leaveCategory) => (
						<span className='w-full'>{leaveCategory.remaining_days}</span>
					))}
				</div>
			);
		},
	},
];
