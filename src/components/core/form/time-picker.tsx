import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';

import { FormDatePickerProps } from './types';

const FormDateTimePicker: React.FC<FormDatePickerProps> = ({
	field,
	label,
	subLabel,
	optional = false,
	className,
	disableLabel,
	calendarProps,
	disabled = false,
}) => {
	function handleTimeChange(type: 'hour' | 'minute' | 'ampm', value: string) {
		const currentDate = field.value || new Date();
		const newDate = new Date(currentDate);

		if (type === 'hour') {
			const hour = parseInt(value, 10);
			newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
		} else if (type === 'minute') {
			newDate.setMinutes(parseInt(value, 10));
		} else if (type === 'ampm') {
			const hours = newDate.getHours();
			if (value === 'AM' && hours >= 12) {
				newDate.setHours(hours - 12);
			} else if (value === 'PM' && hours < 12) {
				newDate.setHours(hours + 12);
			}
		}

		field.onChange(formatDate(newDate));
	}

	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							type='button'
							variant={'gradient'}
							className={cn(
								'h-10 w-full text-left font-normal transition-none active:scale-100',
								!field.value && 'text-muted-foreground',
								className
							)}
							disabled={disabled}
						>
							{field.value ? (
								format(field.value, 'hh:mm aa')
							) : (
								<span>hh:mm aa</span>
							)}
							<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0'>
					<div className='sm:flex'>
						<div className='flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0'>
							<ScrollArea className='w-64 sm:w-auto'>
								<div className='flex p-2 sm:flex-col'>
									{Array.from({ length: 12 }, (_, i) => i + 1)
										.reverse()
										.map((hour) => (
											<Button
												key={hour}
												size='icon'
												variant={
													field.value && new Date(field.value).getHours() % 12 === hour % 12
														? 'default'
														: 'ghost'
												}
												className='aspect-square shrink-0 sm:w-full'
												onClick={() => handleTimeChange('hour', hour.toString())}
											>
												{hour}
											</Button>
										))}
								</div>
								<ScrollBar orientation='horizontal' className='sm:hidden' />
							</ScrollArea>
							<ScrollArea className='w-64 sm:w-auto'>
								<div className='flex p-2 sm:flex-col'>
									{Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
										<Button
											key={minute}
											size='icon'
											variant={
												field.value && new Date(field.value).getMinutes() === minute
													? 'default'
													: 'ghost'
											}
											className='aspect-square shrink-0 sm:w-full'
											onClick={() => handleTimeChange('minute', minute.toString())}
										>
											{minute.toString().padStart(2, '0')}
										</Button>
									))}
								</div>
								<ScrollBar orientation='horizontal' className='sm:hidden' />
							</ScrollArea>
							<ScrollArea className=''>
								<div className='flex p-2 sm:flex-col'>
									{['AM', 'PM'].map((ampm) => (
										<Button
											key={ampm}
											size='icon'
											variant={
												field.value &&
												((ampm === 'AM' && new Date(field.value).getHours() < 12) ||
													(ampm === 'PM' && new Date(field.value).getHours() >= 12))
													? 'default'
													: 'ghost'
											}
											className='aspect-square shrink-0 sm:w-full'
											onClick={() => handleTimeChange('ampm', ampm)}
										>
											{ampm}
										</Button>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
};

export default FormDateTimePicker;
