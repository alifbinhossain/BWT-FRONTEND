import React from 'react';
import { getMonth, getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { MONTH_NAMES } from '@/lib/utils';

interface MonthNavigationProps {
	month: number;
	year: number;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	maxDate?: Date;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
	month,
	year,
	onPrevMonth,
	onNextMonth,
	maxDate = new Date(),
}) => {
	return (
		<div className='flex items-center gap-2'>
			<Button
				variant='outline'
				size='icon'
				onClick={onPrevMonth}
				className='h-10 w-10'
				aria-label='Previous month'
			>
				<ChevronLeft className='h-4 w-4' />
			</Button>

			<span className='min-w-[140px] text-center text-lg font-medium'>
				{MONTH_NAMES[month]} {year}
			</span>

			<Button
				variant='outline'
				size='icon'
				onClick={onNextMonth}
				disabled={getMonth(maxDate) === month && getYear(maxDate) === year}
				className='h-10 w-10'
				aria-label='Next month'
			>
				<ChevronRight className='h-4 w-4' />
			</Button>
		</div>
	);
};
