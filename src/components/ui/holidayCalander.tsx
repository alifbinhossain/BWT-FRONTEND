'use client';

import * as React from 'react';
import { getMonth, getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayPickerProps } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function HolidayCalendar({
	className,
	classNames,
	captionLayout,
	showOutsideDays = true,
	...props
}: DayPickerProps & { selected: Date | any; highlightedDates: { date: Date; info: string }[] }) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				month: 'space-y-6', // 👈 more space between weeks
				months: 'flex flex-col sm:flex-row space-y-6 sm:space-y-0 relative',
				month_caption: 'flex justify-center pt-1 relative items-center',
				month_grid: 'w-full border-collapse space-y-2', // 👈 more vertical space
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
				weeks: 'w-full border-collapse space-y-4', // 👈 more vertical space between weeks
				weekdays: 'flex gap-4',
				weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
				week: 'flex w-full gap-1 mt-5', // 👈 horizontal gap between days
				day_button:
					'h-9 w-9 text-center text-sm p-0 relative mx-[2px] my-[2px] [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
				day: cn(buttonVariants({ variant: 'ghost' }), 'h-12 w-12 p-0 font-normal aria-selected:opacity-100'),
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
					const currentMonth = getMonth(new Date(props.selected));

					return (
						<select defaultValue={currentMonth} onChange={onChange}>
							{options?.map((e, index) => (
								<option key={e.label} value={e.value}>
									{e.label}
								</option>
							))}
						</select>
					);
				},

				YearsDropdown: ({ onChange, options }) => {
					const currentMonth = getYear(new Date(props.selected));
					return (
						<select defaultValue={currentMonth} onChange={onChange}>
							{options?.map((e, index) => (
								<option key={e.label} value={e.value}>
									{e.label}
								</option>
							))}
						</select>
					);
				},

				Day: ({ day, modifiers, ...dayProps }) => {
					const holiday = props.highlightedDates?.find(
						(h) => day.date.toDateString() === h.date.toDateString()
					);

					return holiday?.info ? (
						<Tooltip>
							<TooltipTrigger>
								{' '}
								<div
									{...dayProps}
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'h-12 w-12 p-0 font-normal aria-selected:opacity-100 cursor-pointer',
										holiday?.info ? 'bg-yellow-200 text-black' : ''
									)}
								>
									{day.date.getDate()}
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{holiday?.info}</p>
							</TooltipContent>
						</Tooltip>
					) : (
						<div
							{...dayProps}
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'h-12 w-12 p-0 font-normal aria-selected:opacity-100 cursor-pointer',
								holiday?.info ? 'bg-yellow-200 text-black' : ''
							)}
						>
							{day.date.getDate()}
						</div>
					);
				},
			}}
			captionLayout={captionLayout}
			// modifiers={{
			// 	highlighted: props.selected,
			// }}
			// modifiersClassNames={{
			// 	highlighted: 'bg-yellow-200 text-black', // Tailwind classes for highlight
			// }}
			{...props}
		/>
	);
}
HolidayCalendar.displayName = 'Calendar';

export { HolidayCalendar };
