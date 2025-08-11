import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import ReactSelect from '@/components/ui/react-select';
import SingleDatePicker from '@/components/ui/single-date-picker';

import { useOtherDepartment } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { dailyAbsentColumns } from '../_config/columns';
import { IDailyAbsentTableData } from '../_config/columns/columns.type';
import { useReportDailyAbsent } from '../_config/query';
import { statusOptions } from '../summery/utiils';

const Info = () => {
	const [date, setDate] = useState(new Date());
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [department, setDepartment] = useState<string | undefined>('');
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const { data, url, isLoading, refetch } = useReportDailyAbsent<IDailyAbsentTableData[]>(
		format(date, 'yyyy/MM/dd'),
		status,
		department
	);

	const pageInfo = useMemo(() => new PageInfo('Report/Daily Absent', url, 'report__absent_daily'), []);

	//* Table Columns
	const columns = dailyAbsentColumns();

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
						<ReactSelect
							placeholder='Select Status'
							options={statusOptions}
							value={statusOptions.find((option) => option.value === status)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
								control: (base) => ({ ...base, minWidth: 120 }),
							}}
							onChange={(e: any) => {
								setStatus(e?.value);
							}}
						/>
					</>
				}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
