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



import { IDailyLateTableData } from './columns.type';


// * Daily Late
export const dailyLateColumns = (): ColumnDef<IDailyLateTableData>[] => [
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
		accessorKey: 'entry_time',
		header: 'Entry',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_hours',
		header: 'Late By',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_application_status',
		header: 'Application\nStatus',
		enableColumnFilter: false,
		cell: (info) => {
			if (info.getValue() === 'Not Applied') {
				return (
					<span className='rounded-sm bg-destructive px-2 py-1 text-xs text-white'>
						{' '}
						{info.getValue() as string}
					</span>
				);
			} else {
				return (
					<span className='rounded-sm bg-success px-2 py-1 text-xs text-white'>
						{' '}
						{info.getValue() as string}
					</span>
				);
			}
		},
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Today',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'hours_worked',
		header: 'Working Hours',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_count',
		header: 'Total Late\n This Month',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_count',
		header: 'Total Late\n This Month',
		enableColumnFilter: false,
	},
];