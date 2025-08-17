'use client';

import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayPickerProps } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	captionLayout,
	showOutsideDays = true,
	...props
}: DayPickerProps & { selected: Date | any }) {
	// Keep track of the currently displayed month
	const [month, setMonth] = useState<Date>(props.selected || new Date());

	return (
		<DayPicker
			month={month}
			onMonthChange={setMonth} // updates month when chevrons are clicked
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				month: 'space-y-4',
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-y-0 relative',
				month_caption: 'flex justify-center pt-1 relative items-center',
				month_grid: 'w-full border-collapse space-y-1',
				caption_label: cn('text-sm font-medium', captionLayout === 'dropdown' && 'hidden'),
				nav: 'flex items-center justify-between absolute inset-x-0',
				button_previous: cn(
					buttonVariants({ variant: 'outline' }),
					'z-10 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				button_next: cn(
					buttonVariants({ variant: 'outline' }),
					'z-10 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				weeks: 'w-full border-collapse space-y-',
				weekdays: 'flex',
				weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
				week: 'flex w-full mt-2',
				day_button:
					'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
				day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
				range_end: 'day-range-end',
				selected:
					'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
				today: 'bg-accent text-accent-foreground',
				outside:
					'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
				disabled: 'text-muted-foreground opacity-50',
				range_middle: 'rounded-none aria-selected:bg-gray-200 aria-selected:text-foreground',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				Chevron: ({ ...props }) =>
					props.orientation === 'left' ? (
						<ChevronLeft {...props} className='h-4 w-4' />
					) : (
						<ChevronRight {...props} className='h-4 w-4' />
					),

				MonthsDropdown: ({ onChange, options }) => {
					const currentMonth = getMonth(month);
					return (
						<select
							value={currentMonth}
							onChange={(e) => {
								const newMonth = new Date(month);
								newMonth.setMonth(Number(e.target.value));
								setMonth(newMonth);
								onChange?.(e);
							}}
						>
							{options?.map((e) => (
								<option key={e.label} value={e.value}>
									{e.label}
								</option>
							))}
						</select>
					);
				},

				YearsDropdown: ({ onChange, options }) => {
					const currentYear = getYear(month);
					return (
						<select
							value={currentYear}
							onChange={(e) => {
								const newMonth = new Date(month);
								newMonth.setFullYear(Number(e.target.value));
								setMonth(newMonth);
								onChange?.(e);
							}}
						>
							{options?.map((e) => (
								<option key={e.label} value={e.value}>
									{e.label}
								</option>
							))}
						</select>
					);
				},
			}}
			captionLayout={captionLayout}
			{...props}
		/>
	);
}
Calendar.displayName = 'Calendar';

export { Calendar };
