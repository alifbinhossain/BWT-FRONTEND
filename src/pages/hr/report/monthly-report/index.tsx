import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format, subBusinessDays } from 'date-fns';
import { create } from 'lodash';
import { DateRange } from 'react-day-picker';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateTimePicker } from '@/components/ui/date-time-picker';

import { PageInfo } from '@/utils';

import { monthlyReportColumns } from '../../_config/columns';
import { IMonthlyReportTableData } from '../../_config/columns/columns.type';
import { useReportMonthly } from '../../_config/query';

const Info = () => {
	const defaultDateRange: DateRange = {
		from: subBusinessDays(new Date(), 30),
		to: new Date(),
	};
	const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

	const { data, isLoading, refetch } = useReportMonthly<IMonthlyReportTableData[]>(
		format(dateRange.from ?? new Date(), 'yyyy/MM/dd'),
		format(dateRange.to ?? new Date(), 'yyyy/MM/dd')
	);

	const pageInfo = useMemo(() => new PageInfo('Report/Monthly', '/hr/report/monthly', 'report__monthly_report'), []);

	//* Table Columns
	const columns = monthlyReportColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ updated_at: false, created_by_name: false, created_at: false }}
				otherToolBarComponents={
					<>
						{/* <DateTimePicker className='h-[2rem] w-fit' onChange={setFrom} value={from} />
						<DateTimePicker className='h-[2rem] w-fit' onChange={setTo} value={to} /> */}
						<DateRangePicker
							className='h-9 w-80 justify-start'
							initialDateFrom={dateRange?.from}
							initialDateTo={dateRange?.to}
							align={'center'}
							onUpdate={({ range }) => {
								setDateRange(range);
							}}
							onClear={() => {
								setDateRange(defaultDateRange);
							}}
						/>
					</>
				}
				enableDefaultColumns={false}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
