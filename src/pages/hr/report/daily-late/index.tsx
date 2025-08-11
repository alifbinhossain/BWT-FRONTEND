import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelect from '@/components/ui/react-select';
import SingleDatePicker from '@/components/ui/single-date-picker';

import { useOtherDepartment } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { dailyLateColumns } from './_config/columns';
import { IDailyLateTableData } from './_config/columns/columns.type';
import { useReportDailyLate } from './_config/query';

const Info = () => {
	const [date, setDate] = useState(new Date());
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [department, setDepartment] = useState(undefined);
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const { data, url, isLoading, refetch } = useReportDailyLate<IDailyLateTableData[]>(
		format(date, 'yyyy/MM/dd'),
		department
	);

	const pageInfo = useMemo(() => new PageInfo('Report/Daily Late', url, 'report__daily_late'), []);

	//* Table Columns
	const columns = dailyLateColumns();

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
						<SingleDatePicker selected={date} onSelect={setDate} maxDate={new Date()} />
						<ReactSelect
							placeholder='Select Department'
							options={departmentOptions}
							value={departmentOptions?.find((option) => option.value === department)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
								control: (base) => ({ ...base, minWidth: 120 }),
							}}
							onChange={(e: any) => {
								setDepartment(e?.value);
							}}
						/>
					</>
				}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
