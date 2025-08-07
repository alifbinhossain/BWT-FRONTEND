import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format, getYear, lastDayOfMonth } from 'date-fns';
import { get, last } from 'lodash';

import YearPickerPopover from '@/components/others/year-picker-pop-up';

import { getDateTime, PageInfo } from '@/utils';

import { leaveBalance } from '../_config/columns';
import { ILeaveBalance } from '../_config/columns/columns.type';
import { useReportLeaveBalance } from '../_config/query';

const Info = () => {
	const [years, setYears] = useState(new Date());
	let to;
	if (getYear(years) === getYear(getDateTime())) {
		to = format(getDateTime(), 'yyyy/MM/dd');
	} else {
		to = `${getYear(years)}/12/31`;
	}
	const { data, isLoading, url, refetch } = useReportLeaveBalance<ILeaveBalance[]>(`${getYear(years)}/01/01`, to);

	const pageInfo = useMemo(() => new PageInfo('Report/Leave Balance', url, 'report__leave_balance'), []);

	//* Table Columns
	const columns = leaveBalance();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ updated_at: false, created_by_name: false, created_at: false, remarks: false }}
				otherToolBarComponents={
					<>
						<YearPickerPopover date={years} setDate={setYears} />
					</>
				}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
