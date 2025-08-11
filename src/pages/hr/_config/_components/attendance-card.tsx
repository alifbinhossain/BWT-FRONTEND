import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IAttendanceCardProps } from '../columns/columns.type';
import { formatDecimalHours } from '../utils';

const AttendanceCard: React.FC<IAttendanceCardProps> = ({
	status,
	entry_time,
	exit_time,
	late_hours,
	early_exit_hours,
	hours_worked,
	expected_hours,
}) => {
	return (
		<div
			className={cn(
				'w-[210px] space-y-2 rounded-lg border p-4 text-sm shadow-sm',
				status === 'Absent' && 'border-red-200 bg-red-50',
				status === 'Late' && 'border-yellow-200 bg-yellow-50',
				status === 'Early Exit' && 'border-orange-200 bg-orange-50',
				status === 'Present' && 'border-green-200 bg-green-50',
				status === 'Off Day' && 'border-blue-200 bg-blue-50',
				status === 'Leave' && 'border-purple-200 bg-purple-50'
			)}
		>
			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Status:</strong>
				<span
					className={cn(
						'rounded-full border px-3 py-0.5 text-xs font-medium capitalize',
						status === 'Absent' && 'border-red-500 bg-red-100 text-red-700',
						status === 'Late' && 'border-yellow-500 bg-yellow-100 text-yellow-700',
						status === 'Early Exit' && 'border-orange-500 bg-orange-100 text-orange-700',
						status === 'Present' && 'border-green-500 bg-green-100 text-green-700',
						status === 'Off Day' && 'border-blue-500 bg-blue-100 text-blue-700',
						status === 'Leave' && 'border-purple-500 bg-purple-100 text-purple-700'
					)}
				>
					{status ?? 'N/A'}
				</span>
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Entry:</strong>
				{entry_time ? (
					<DateTime
						date={entry_time as Date}
						isTime={true}
						isDate={false}
						ClassNameTime={cn(
							'px-2 text-sm',
							status === 'Late' && 'rounded-full bg-yellow-200 text-yellow-700'
						)}
					/>
				) : (
					<span className='px-2'>--</span>
				)}
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Exit:</strong>
				{exit_time ? (
					<DateTime
						date={exit_time as Date}
						isTime={true}
						isDate={false}
						ClassNameTime={cn(
							'px-2 text-sm',
							status === 'Early Exit' && 'rounded-full bg-orange-200 text-yellow-700'
						)}
					/>
				) : (
					<span className='px-2'>--</span>
				)}
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Late:</strong>
				<span className={cn('px-2', status === 'Late' && 'rounded-full bg-yellow-200 px-2 text-yellow-700')}>
					{status === 'Absent' ? '-' : formatDecimalHours(late_hours)}
				</span>
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Early Exit:</strong>
				<span
					className={cn('px-2', status === 'Early Exit' && 'rounded-full bg-orange-200 px-2 text-orange-700')}
				>
					{status === 'Absent' ? '-' : formatDecimalHours(early_exit_hours)}
				</span>
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Worked:</strong>
				<span className='px-2'>{status === 'Absent' ? '-' : formatDecimalHours(hours_worked)}</span>
			</div>

			<div className='flex items-center gap-2'>
				<strong className='min-w-[80px]'>Expected:</strong>
				<span className='px-2'>{formatDecimalHours(expected_hours)}</span>
			</div>
		</div>
	);
};

export default AttendanceCard;
