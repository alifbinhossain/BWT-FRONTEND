import { spawn } from 'child_process';
import { DateAccessor } from '@/pages/hr/_config/columns/columns.type';
import { IStatus } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format, getWeek } from 'date-fns';

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

import { decimalHoursToHourMinute, getWeekDay } from '../../utils';
import { IWorkingHourTableData } from './columns.type';

// * Working Hour Columns
export const workingHourColumns = (dateAccessor: string[]): ColumnDef<IWorkingHourTableData>[] => [
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
		accessorFn: (row) => row.shift_details.name,
		header: 'Shift',
		enableColumnFilter: false,
	},
	...dateAccessor.map((date) => ({
		accessorKey: date,
		header: `${format(date, 'dd.MM.yyyy')} (${getWeekDay(new Date(date))})`,
		enableColumnFilter: false,
		size: 210,
		cell: (info: any) => {
			const { entry_time, exit_time, hours_worked, expected_hours, status } = info.getValue() as DateAccessor;
			if (!entry_time && !exit_time) {
				return '-';
			} else if (expected_hours > hours_worked && status !== 'Off Day') {
				return (
					<div className='flex flex-col gap-2'>
						<span className='text-red-500'>{decimalHoursToHourMinute(hours_worked as number)}</span>
						<span className='text-xs text-red-400'>
							-
							{decimalHoursToHourMinute(
								((expected_hours as number) - (hours_worked as number)) as number
							)}
						</span>
					</div>
				);
			} else if (status === 'Off Day') {
				return (
					<div className='flex flex-col gap-2'>
						<span className='text-green-500'>{decimalHoursToHourMinute(hours_worked as number)}</span>
						<span className='text-xs text-gray-400'>Off day</span>
					</div>
				);
			} else if (expected_hours === hours_worked) {
				return (
					<div className='flex flex-col gap-2'>
						<span>{decimalHoursToHourMinute(hours_worked as number)}</span>
						<span>0</span>
					</div>
				);
			} else {
				<div className='flex flex-col gap-2'>
					<span className='text-green-500'>{decimalHoursToHourMinute(hours_worked as number)}</span>
					<span className='text-xs text-green-400'>
						+{decimalHoursToHourMinute(((hours_worked as number) - (expected_hours as number)) as number)}
					</span>
				</div>;
			}
		},
	})),
	{
		accessorKey: 'total_expected_hours',
		header: 'Expected Working Hour',
		enableColumnFilter: false,
		cell: (info) => {
			return <span>{decimalHoursToHourMinute(info.getValue() as number)}</span>;
		},
	},
	{
		accessorKey: 'total_hour_difference',
		header: 'Difference',
		enableColumnFilter: false,
		cell: (info) => {
			if ((info.getValue() as number) <= 0) {
				return <span className='text-green-500'>{decimalHoursToHourMinute(info.getValue() as number)}</span>;
			} else if ((info.getValue() as number) > 0) {
				return <span className='text-red-500'>{decimalHoursToHourMinute(info.getValue() as number)}</span>;
			}
			return <span>{decimalHoursToHourMinute(info.getValue() as number)}</span>;
		},
	},
	{
		accessorKey: 'average_hours_worked',
		header: 'Average',
		enableColumnFilter: false,
		cell: (info) => {
			return <span>{decimalHoursToHourMinute(info.getValue() as number)}</span>;
		},
	},
];
