import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MonthPicker } from '@/components/ui/month-picker';

import { cn } from '@/lib/utils';
import { getDateTime } from '@/utils';

export default function MonthPickerPopover({
	minDate,
	maxDate,
	label,
	subLabel,
	optional,
	disableLabel,
	field,
	disabled = false,
}: {
	minDate?: Date;
	maxDate?: Date;
	label?: string;
	subLabel?: string;
	optional?: boolean;
	disableLabel?: boolean;
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	disabled?: boolean;
}) {
	const [open, setOpen] = useState(false);
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
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={'outline'}
							className={cn(
								'w-full justify-start text-left font-normal',
								!field.value && 'text-muted-foreground'
							)}
							disabled={disabled}
						>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{field.value ? format(field.value, 'MMM yyyy') : <span>Pick a month</span>}
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent style={{ zIndex: 9999 }} className='h-full w-full border bg-slate-50'>
					<MonthPicker
						className='z-50'
						onMonthSelect={(date) => {
							field.onChange(format(date, 'yyyy-MM-dd HH:mm:ss'));
							setOpen(false);
						}}
						selectedMonth={
							field.value
								? format(new Date(field.value), 'yyyy-MM-dd HH:mm:ss')
								: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
						}
						maxDate={maxDate || new Date()}
						minDate={minDate || undefined}
					/>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
}
