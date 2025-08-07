import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { endOfMonth, format, getMonth, getYear, startOfMonth, subDays } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import YearPickerPopover from '@/components/others/year-picker-pop-up';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import ReactSelect from '@/components/ui/react-select';

import { useOtherDepartment } from '@/lib/common-queries/other';
import { getDateTime, PageInfo } from '@/utils';

import { absentSummery } from '../_config/columns';
import { IAbsentSummery } from '../_config/columns/columns.type';
import { useReportAbsentSummery } from '../_config/query';
import { statusOptions } from './utiils';

const Info = () => {
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [department, setDepartment] = useState('');
	const [from, setFrom] = useState<Date | string>(
		startOfMonth(`${getYear(new Date())}/${getMonth(new Date()) + 1}/01`)
	);
	const [to, setTo] = useState<Date | string>(new Date());

	const { data, isLoading, url, refetch } = useReportAbsentSummery<IAbsentSummery[]>(
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd'),
		status,
		department
	);
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const pageInfo = useMemo(() => new PageInfo('Report/Absent Summery', url, 'report__absent_summery'), []);

	//* Table Columns
	const columns = absentSummery();

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
						<DateRangePicker
							className='h-9 w-80 justify-start'
							initialDateFrom={from}
							initialDateTo={to}
							align={'center'}
							maxDate={new Date()}
							onUpdate={({ range }) => {
								setFrom(format(range.from, 'yyyy-MM-dd'));
								setTo(format(range.to!, 'yyyy-MM-dd'));
							}}
							onClear={() => {
								setFrom(
									format(
										startOfMonth(`${getYear(new Date())}/${getMonth(new Date()) + 1}/01`),
										'yyyy-MM-dd'
									)
								);
								setTo(format(new Date(), 'yyyy-MM-dd'));
							}}
						/>
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
