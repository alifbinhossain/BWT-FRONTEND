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

import { ILate } from './columns.type';

//* Absent Summery
export const absentSummery = (): ColumnDef<ILate>[] => [
	{
		accessorKey: 'date',
		header: 'Date',
		enableColumnFilter: false,
		cell: (info) => {
			return <DateTime date={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'late_count',
		header: 'Count',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => row.late_records.map((leaveCategory) => leaveCategory.employee_id),
		header: 'Employee ID',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.late_records.map((leaveCategory) => (
						<span className='py-3'>{leaveCategory.employee_id}</span>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.late_records.map((leaveCategory) => leaveCategory.employee_name),
		header: 'Employee',
		size: 250,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.late_records.map((leaveCategory) => (
						<Profile
							data={{
								name: leaveCategory.employee_name,
								department_name: leaveCategory.employee_department,
								designation_name: leaveCategory.employee_designation,
							}}
							url={`/profile/${leaveCategory.employee_uuid}`}
						/>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.late_records.map((leaveCategory) => leaveCategory.shift),
		header: 'Shift',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.late_records.map((leaveCategory) => (
						<span className='py-3'>{leaveCategory.shift}</span>
					))}
				</div>
			);
		},
	},

	{
		accessorFn: (row) => row.late_records.map((leaveCategory) => leaveCategory.entry_time),
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.late_records.map((leaveCategory) => (
						<div className='py-3'>
							<DateTime date={leaveCategory.entry_time} isDate={false} />
						</div>
					))}
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.late_records.map((leaveCategory) => leaveCategory.late_hours),
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col gap-2'>
					{info.row.original.late_records.map((leaveCategory) => (
						<span className='py-3'>{leaveCategory.late_hours}</span>
					))}
				</div>
			);
		},
	},
];
