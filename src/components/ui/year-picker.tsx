'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button';

type YearPickerProps = {
	selectedYear?: Date;
	onYearSelect?: (date: Date) => void;
	callbacks?: {
		yearLabel?: (year: number) => string;
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
} & React.HTMLAttributes<HTMLDivElement>;

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary' | null | undefined;

function getYearsGrid(centerYear: number, rows: number = 4, cols: number = 4) {
	const startYear = centerYear - Math.floor((rows * cols) / 2);
	const years: number[][] = [];
	for (let i = 0; i < rows; i++) {
		years.push([]);
		for (let j = 0; j < cols; j++) {
			years[i].push(startYear + i * cols + j);
		}
	}
	return years;
}

function YearPicker({
	onYearSelect,
	selectedYear,
	minDate,
	maxDate,
	disabledDates,
	callbacks,
	variant,
	className,
	...props
}: YearPickerProps) {
	const initialYear = selectedYear?.getFullYear() ?? new Date().getFullYear();
	const [menuCenterYear, setMenuCenterYear] = React.useState<number>(initialYear);

	const ROWS = 4;
	const COLS = 4;
	const yearsGrid = getYearsGrid(menuCenterYear, ROWS, COLS);

	// guard
	if (minDate && maxDate && minDate > maxDate) minDate = maxDate;

	// map disabledDates to year
	const disabledYears = disabledDates?.map((d) => d.getFullYear());

	return (
		<div className={cn('w-[280px] min-w-[200px] p-3', className)} {...props}>
			<div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
				<div className='w-full space-y-4'>
					<div className='relative flex items-center justify-center pt-1'>
						<div className='text-sm font-medium'>
							{callbacks?.yearLabel
								? callbacks?.yearLabel(menuCenterYear)
								: `${yearsGrid[0][0]} - ${yearsGrid[ROWS - 1][COLS - 1]}`}
						</div>
						<div className='flex items-center space-x-1'>
							<button
								onClick={() => setMenuCenterYear(menuCenterYear - ROWS * COLS)}
								className={cn(
									buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
									'absolute left-1 inline-flex h-7 w-7 items-center justify-center p-0'
								)}
							>
								<ChevronLeft className='h-4 w-4 opacity-50' />
							</button>
							<button
								onClick={() => setMenuCenterYear(menuCenterYear + ROWS * COLS)}
								className={cn(
									buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
									'absolute right-1 inline-flex h-7 w-7 items-center justify-center p-0'
								)}
							>
								<ChevronRight className='h-4 w-4 opacity-50' />
							</button>
						</div>
					</div>
					<table className='h-full w-full border-collapse space-y-1'>
						<tbody>
							{yearsGrid.map((row, rowIdx) => (
								<tr key={`row-${rowIdx}`} className='mt-2 flex w-full'>
									{row.map((year) => {
										const isSelected = selectedYear ? selectedYear.getFullYear() === year : false;
										const isDisabled =
											(maxDate && year > maxDate.getFullYear()) ||
											(minDate && year < minDate.getFullYear()) ||
											(disabledYears && disabledYears.includes(year));
										return (
											<td
												key={year}
												className='relative h-10 w-1/4 p-0 text-center text-sm focus-within:relative focus-within:z-20'
											>
												<button
													disabled={isDisabled}
													className={cn(
														buttonVariants({
															variant: isSelected
																? (variant?.calendar?.selected ?? 'default')
																: (variant?.calendar?.main ?? 'ghost'),
														}),
														'h-full w-full p-0 font-normal aria-selected:opacity-100'
													)}
													onClick={() => {
														if (onYearSelect) onYearSelect(new Date(year, 0));
													}}
												>
													{callbacks?.yearLabel ? callbacks.yearLabel(year) : year}
												</button>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

YearPicker.displayName = 'YearPicker';

export { YearPicker };
