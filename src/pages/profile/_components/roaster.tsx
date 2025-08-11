import React from 'react';
import { useMonthYearNavigation } from '@/hooks/useMonthYearNavigation';

import { Separator } from '@/components/ui/separator';

import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';
import { MONTH_NAMES } from '@/lib/utils';

import { MonthNavigation } from '../../../components/others/month-navigation';
import { useRosterData } from '../hooks/useRoasterData';
import { ROSTER_TABLE_COLUMNS } from '../utils';

const Roaster: React.FC = () => {
	const { month, year, handlePrev, handleNext } = useMonthYearNavigation();
	const { tableData } = useRosterData(month || 0, year);
	const { firstDataTable, secondDataTable, thirdDataTable } = tableData;

	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-semibold'>
					Time details of {MONTH_NAMES[month || 0]} {year}
				</h1>
				<MonthNavigation
					month={month || 0}
					year={year}
					onPrevMonth={handlePrev}
					onNextMonth={handleNext}
				/>
			</div>
			<Separator className='my-4' />
			<div className='grid grid-cols-3 gap-4'>
				<TableWithoutTitleBackground columns={ROSTER_TABLE_COLUMNS} data={firstDataTable} />
				<TableWithoutTitleBackground columns={ROSTER_TABLE_COLUMNS} data={secondDataTable} />
				<TableWithoutTitleBackground columns={ROSTER_TABLE_COLUMNS} data={thirdDataTable} />
			</div>
		</div>
	);
};

export default Roaster;
