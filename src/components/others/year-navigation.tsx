import React from 'react';
import { getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

interface YearNavigationProps {
	year: number;
	onPrevYear: () => void;
	onNextYear: () => void;
	maxYear?: number;
}

export const YearNavigation: React.FC<YearNavigationProps> = ({
	year,
	onPrevYear,
	onNextYear,
	maxYear = getYear(getDateTime()),
}) => {
	return (
		<div className='flex items-center gap-2'>
			<Button
				variant='outline'
				size='icon'
				onClick={onPrevYear}
				className='h-10 w-10'
				aria-label='Previous month'
			>
				<ChevronLeft className='h-4 w-4' />
			</Button>

			<span className='min-w-[140px] text-center text-lg font-medium'>{year}</span>

			<Button
				variant='outline'
				size='icon'
				disabled={year === maxYear}
				onClick={onNextYear}
				className='h-10 w-10'
				aria-label='Next month'
			>
				<ChevronRight className='h-4 w-4' />
			</Button>
		</div>
	);
};
