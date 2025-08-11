'use client';

import * as React from 'react';
import { format, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface IProps {
	selected: Date;
	onSelect: (date: Date) => void;
	disableIcon?: boolean;
	className?: string;
	size?: 'sm' | 'lg' | 'default' | 'xs' | 'icon' | null | undefined;
	minDate?: Date;
	maxDate?: Date;
	disabled?: (date: Date) => boolean;
}

const SingleDatePicker: React.FC<IProps> = ({
	selected,
	onSelect,
	disableIcon = false,
	className,
	size = 'sm',
	minDate,
	maxDate,
	disabled,
}) => {
	if (!selected || !isValid(selected)) return null;

	// Create a disabled function that combines minDate, maxDate, and custom disabled
	const isDisabled = React.useCallback(
		(date: Date) => {
			// Check minDate constraint
			if (minDate && date < minDate) return true;

			// Check maxDate constraint
			if (maxDate && date > maxDate) return true;

			// Check custom disabled function
			if (disabled && disabled(date)) return true;

			return false;
		},
		[minDate, maxDate, disabled]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size={size}
					variant={'outline'}
					className={cn(
						'min-w-[140px] max-w-fit justify-start text-left font-normal transition-none active:scale-100',
						!selected && 'text-muted-foreground',
						className
					)}
				>
					{!disableIcon && <CalendarIcon className='size-5' />}
					{selected ? format(selected, 'MMM d, y') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={selected}
					onSelect={(date) => {
						if (!date) return;
						onSelect(date);
					}}
					disabled={isDisabled}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default SingleDatePicker;
