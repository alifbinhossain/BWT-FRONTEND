import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { status } from '@/pages/hr/field-visit/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import MonthPickerPopover from '@/components/others/month-picker-pop-up';
import ReactSelect from '@/components/ui/react-select';

import { useOtherLeaveCategory } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { reportLeaveHistory } from '../_config/columns';
import { IHistoryTableData } from '../_config/columns/columns.type';
import { useReportLeaveHistory } from '../_config/query';

const Info = () => {
	const [category, setCategory] = useState('');
	const [approval, setApproval] = useState('');
	const [date, setDate] = useState(new Date());
	const from = startOfMonth(date);
	const to = endOfMonth(date);

	const { data, url, isLoading, refetch } = useReportLeaveHistory<IHistoryTableData[]>(
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd'),
		category,
		approval
	);
	const { data: categoryOptions } = useOtherLeaveCategory<IFormSelectOption[]>();

	const pageInfo = useMemo(() => new PageInfo('Report/Leave History', url, 'report__leave_history'), []);

	//* Table Columns
	const columns = reportLeaveHistory();

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
						<MonthPickerPopover date={date} setDate={setDate} />
						<ReactSelect
							placeholder='Select Category'
							options={categoryOptions}
							value={categoryOptions?.find((option) => option.value === category)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
								control: (base) => ({ ...base, minWidth: 120 }),
							}}
							onChange={(e: any) => {
								setCategory(e?.value);
							}}
						/>
						<ReactSelect
							placeholder='Select Status'
							options={status}
							value={status?.find((option) => option.value === approval)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
								control: (base) => ({ ...base, minWidth: 120 }),
							}}
							onChange={(e: any) => {
								setApproval(e?.value);
							}}
						/>
					</>
				}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
