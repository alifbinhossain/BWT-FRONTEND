import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { YearPicker } from '../ui/year-picker';

export default function YearPickerPopover({
	date,
	setDate,
	maxDate,
	minDate,
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
					{date ? format(date, 'yyyy') : <span>Pick a month</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent style={{ zIndex: 9999 }} className='h-full w-auto border bg-slate-50'>
				<YearPicker
					className='z-50'
					onYearSelect={setDate}
					selectedYear={date}
					maxDate={maxDate || new Date()}
					minDate={minDate || undefined}
				/>
			</PopoverContent>
		</Popover>
	);
}
