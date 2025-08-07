import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format } from 'date-fns';

import { DateTimePicker } from '@/components/ui/date-time-picker';

import { PageInfo } from '@/utils';

import { monthlyReportColumns } from '../../_config/columns';
import { IMonthlyReportTableData } from '../../_config/columns/columns.type';
import { useReportMonthly } from '../../_config/query';
import { create } from 'lodash';

const Info = () => {
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const { data, isLoading, refetch } = useReportMonthly<IMonthlyReportTableData[]>(
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd')
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
				defaultVisibleColumns={{ updated_at: false, created_by_name: false }}
				otherToolBarComponents={
					<>
						<DateTimePicker className='h-[2rem] w-fit' onChange={setFrom} value={from} />
						<DateTimePicker className='h-[2rem] w-fit' onChange={setTo} value={to} />
					</>
				}
				enableDefaultColumns={false}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
