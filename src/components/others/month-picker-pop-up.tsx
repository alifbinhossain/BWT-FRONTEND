import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getDateTime } from '@/utils';

import { Button } from '../ui/button';
import { MonthPicker } from '../ui/month-picker';

export default function MonthPickerPopover({
	date,
	setDate,
	minDate,
	maxDate,
}: {
	date: Date;
	setDate: (date: Date) => void;
	minDate?: Date;
	maxDate?: Date;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'MMM yyyy') : <span>Pick a month</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent style={{ zIndex: 9999 }} className='h-full w-auto border bg-slate-50'>
				<MonthPicker
					className='z-50'
					onMonthSelect={setDate}
					selectedMonth={date}
					maxDate={maxDate || new Date()}
					minDate={minDate || undefined}
				/>
			</PopoverContent>
		</Popover>
	);
}
