import * as React from 'react';
import { getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button';

type Month = {
	number: number;
	name: string;
};

const MONTHS: Month[][] = [
	[
		{ number: 0, name: 'Jan' },
		{ number: 1, name: 'Feb' },
		{ number: 2, name: 'Mar' },
		{ number: 3, name: 'Apr' },
	],
	[
		{ number: 4, name: 'May' },
		{ number: 5, name: 'Jun' },
		{ number: 6, name: 'Jul' },
		{ number: 7, name: 'Aug' },
	],
	[
		{ number: 8, name: 'Sep' },
		{ number: 9, name: 'Oct' },
		{ number: 10, name: 'Nov' },
		{ number: 11, name: 'Dec' },
	],
];

type MonthCalProps = {
	selectedMonth?: Date | string;
	onMonthSelect?: (date: Date) => void;
	onYearForward?: () => void;
	onYearBackward?: () => void;
	callbacks?: {
		yearLabel?: (year: number) => string;
		monthLabel?: (month: Month) => string;
	};
	variant?: {
		calendar?: {
			main?: ButtonVariant;
			selected?: ButtonVariant;
		};
		chevrons?: ButtonVariant;
	};
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
};

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary' | null | undefined;

function MonthPicker({
	onMonthSelect,
	selectedMonth,
	minDate,
	maxDate,
	disabledDates,
	callbacks,
	onYearBackward,
	onYearForward,
	variant,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & MonthCalProps) {
	return (
		<div className={cn('w-[280px] min-w-[200px] p-3', className)} {...props}>
			<div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
				<div className='w-full space-y-4'>
					<MonthCal
						onMonthSelect={onMonthSelect}
						callbacks={callbacks}
						selectedMonth={selectedMonth}
						onYearBackward={onYearBackward}
						onYearForward={onYearForward}
						variant={variant}
						minDate={minDate}
						maxDate={maxDate}
						disabledDates={disabledDates}
					></MonthCal>
				</div>
			</div>
		</div>
	);
}

function MonthCal({
	selectedMonth,
	onMonthSelect,
	callbacks,
	variant,
	minDate,
	maxDate,
	disabledDates,
	onYearBackward,
	onYearForward,
}: MonthCalProps) {
	const [year, setYear] = React.useState<number>(getYear(selectedMonth as Date) ?? new Date().getFullYear());
	const [month, setMonth] = React.useState<number>(getYear(selectedMonth as Date) ?? new Date().getMonth());
	const [menuYear, setMenuYear] = React.useState<number>(year);
	const [yearInputValue, setYearInputValue] = React.useState<string>(menuYear.toString());
	const [isEditingYear, setIsEditingYear] = React.useState<boolean>(false);

	if (minDate && maxDate && minDate > maxDate) minDate = maxDate;

	const disabledDatesMapped = disabledDates?.map((d) => {
		return { year: d.getFullYear(), month: d.getMonth() };
	});

	// Helper function to get min and max years from dates
	const getMinYear = () => minDate?.getFullYear() ?? 1900;
	const getMaxYear = () => maxDate?.getFullYear() ?? 2100;

	// Handle year input change
	const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Allow only numbers
		if (/^\d*$/.test(value)) {
			setYearInputValue(value);
		}
	};

	// Handle year input submit
	const handleYearInputSubmit = () => {
		const newYear = parseInt(yearInputValue);
		const minYear = getMinYear();
		const maxYear = getMaxYear();

		if (!isNaN(newYear) && newYear >= minYear && newYear <= maxYear) {
			setMenuYear(newYear);
			setIsEditingYear(false);
		} else {
			// Reset to current year if invalid
			setYearInputValue(menuYear.toString());
			setIsEditingYear(false);
		}
	};

	// Handle year input key events
	const handleYearInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleYearInputSubmit();
		} else if (e.key === 'Escape') {
			setYearInputValue(menuYear.toString());
			setIsEditingYear(false);
		}
	};

	// Handle year navigation with constraints
	const handleYearBackward = () => {
		const newYear = menuYear - 1;
		const minYear = getMinYear();
		if (newYear >= minYear) {
			setMenuYear(newYear);
			setYearInputValue(newYear.toString());
			if (onYearBackward) onYearBackward();
		}
	};

	const handleYearForward = () => {
		const newYear = menuYear + 1;
		const maxYear = getMaxYear();
		if (newYear <= maxYear) {
			setMenuYear(newYear);
			setYearInputValue(newYear.toString());
			if (onYearForward) onYearForward();
		}
	};

	// Check if year navigation buttons should be disabled
	const isBackwardDisabled = menuYear <= getMinYear();
	const isForwardDisabled = menuYear >= getMaxYear();

	// Sync yearInputValue when menuYear changes from external sources
	React.useEffect(() => {
		setYearInputValue(menuYear.toString());
	}, [menuYear]);

	return (
		<>
			<div className='relative flex items-center justify-center pt-1'>
				{isEditingYear ? (
					<input
						type='text'
						value={yearInputValue}
						onChange={handleYearInputChange}
						onBlur={handleYearInputSubmit}
						onKeyDown={handleYearInputKeyDown}
						className='w-16 rounded border-gray-500 bg-white px-2 py-1 text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:text-white'
						autoFocus
						maxLength={4}
						placeholder={menuYear.toString()}
					/>
				) : (
					<button
						onClick={(e) => {
							e.preventDefault();
							setIsEditingYear(true);
							setMenuYear(menuYear + 1);
						}}
						className='rounded px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
					>
						{callbacks?.yearLabel ? callbacks?.yearLabel(menuYear) : menuYear}
					</button>
				)}
				<div className='flex items-center space-x-1'>
					<button
						onClick={(e) => {
							e.preventDefault();

							handleYearBackward();
						}}
						disabled={isBackwardDisabled}
						className={cn(
							buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
							'absolute left-1 inline-flex h-7 w-7 items-center justify-center p-0',
							isBackwardDisabled && 'cursor-not-allowed opacity-30'
						)}
					>
						<ChevronLeft className='h-4 w-4 opacity-50' />
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();

							handleYearForward();
						}}
						disabled={isForwardDisabled}
						className={cn(
							buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
							'absolute right-1 inline-flex h-7 w-7 items-center justify-center p-0',
							isForwardDisabled && 'cursor-not-allowed opacity-30'
						)}
					>
						<ChevronRight className='h-4 w-4 opacity-50' />
					</button>
				</div>
			</div>
			<table className='h-full w-full border-collapse space-y-1'>
				<tbody>
					{MONTHS.map((monthRow, a) => {
						return (
							<tr key={'row-' + a} className='mt-2 flex w-full'>
								{monthRow.map((m) => {
									return (
										<td
											key={m.number}
											className='relative h-10 w-1/4 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 [&:has([aria-selected].day-range-end)]:rounded-r-md'
										>
											<button
												onClick={() => {
													setMonth(m.number);
													setYear(menuYear);
													if (onMonthSelect) onMonthSelect(new Date(menuYear, m.number));
												}}
												disabled={
													(maxDate
														? menuYear > maxDate?.getFullYear() ||
															(menuYear == maxDate?.getFullYear() &&
																m.number > maxDate.getMonth())
														: false) ||
													(minDate
														? menuYear < minDate?.getFullYear() ||
															(menuYear == minDate?.getFullYear() &&
																m.number < minDate.getMonth())
														: false) ||
													(disabledDatesMapped
														? disabledDatesMapped?.some(
																(d) => d.year == menuYear && d.month == m.number
															)
														: false)
												}
												className={cn(
													buttonVariants({
														variant:
															month == m.number && menuYear == year
																? (variant?.calendar?.selected ?? 'default')
																: (variant?.calendar?.main ?? 'ghost'),
													}),
													'h-full w-full p-0 font-normal aria-selected:opacity-100'
												)}
											>
												{callbacks?.monthLabel ? callbacks.monthLabel(m) : m.name}
											</button>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

MonthPicker.displayName = 'MonthPicker';

export { MonthPicker };
