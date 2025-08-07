import { IStatus } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';

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

import { IAbsentSummery, IDailyAbsentTableData } from './columns.type';

// * Daily Absent
export const dailyAbsentColumns = (): ColumnDef<IDailyAbsentTableData>[] => [
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
						department_name: info.row.original.department_name,
						designation_name: info.row.original.designation_name,
					}}
					url={`/profile/${info.row.original.employee_uuid}`}
				/>
			);
		},
	},
	{
		accessorKey: 'workplace_name',
		header: 'Workplace',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) =>
			row.shift_group_name +
			'(' +
			format(row.start_time, 'HH:mm a') +
			'-' +
			format(row.end_time, 'HH:mm a') +
			')',
		header: 'Shift',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div>
					<p>{info.row.original.shift_group_name}</p>
					<p>
						({format(info.row.original.start_time, 'HH:mm a')}-
						{format(info.row.original.end_time, 'HH:mm a')})
					</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'last_absent',
		header: 'Last Absent',
		enableColumnFilter: false,
		cell: (info) => {
			return <DateTime date={info.getValue() as Date} isTime={false} />;
		},
	},
	{
		accessorKey: 'absent_last_30_days',
		header: 'Absent Last 30 Days',
		enableColumnFilter: false,
	},
];
//* Absent Summery
export const absentSummery = (): ColumnDef<IAbsentSummery>[] => [
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
						department_name: info.row.original.department_name,
						designation_name: info.row.original.designation_name,
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
		accessorFn: (row) =>
			row.absent_days.map(
				(leaveCategory) =>
					leaveCategory.shift_name +
					'(' +
					format(leaveCategory.start_time, 'hh:mm a') +
					' - ' +
					format(leaveCategory.end_time, 'hh:mm a') +
					')'
			),
		header: 'Shift',
		size: 250,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{(info?.getValue() as string[]).map((leaveCategory) => (
						<div>
							<span className='w-full'>{leaveCategory as string}</span>
							<br />
						</div>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.absent_days.map((leaveCategory) => leaveCategory.date),
		header: 'Date',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.absent_days.map((leaveCategory) => (
						<DateTime date={leaveCategory.date} isTime={false} />
					))}
				</div>
			);
		},
	},
	{
		accessorKey: 'unauthorized_absent_days',
		header: 'Days',
		enableColumnFilter: false,
	},
];
