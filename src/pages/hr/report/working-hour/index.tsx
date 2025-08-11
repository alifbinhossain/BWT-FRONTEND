import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { eachDayOfInterval, format, getMonth, getYear, startOfMonth } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import ReactSelect from '@/components/ui/react-select';
import SingleDatePicker from '@/components/ui/single-date-picker';

import { useOtherDepartment } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { statusOptions } from '../absent/summery/utiils';
import { workingHourColumns } from './_config/columns';
import { IWorkingHourTableData } from './_config/columns/columns.type';
import { useReportWorkingHour } from './_config/query';

const Info = () => {
	const [from, setFrom] = useState<Date | string>(
		startOfMonth(`${getYear(new Date())}/${getMonth(new Date()) + 1}/01`)
	);
	const [to, setTo] = useState<Date | string>(new Date());
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [department, setDepartment] = useState(undefined);
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const { data, url, isLoading, refetch } = useReportWorkingHour<IWorkingHourTableData[]>(
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd'),
		department,
		status
	);

	const pageInfo = useMemo(() => new PageInfo('Report/Working Hour', url, 'report__working_hour'), []);
	const dateAccessor = useMemo(() => {
		if (!from || !to || from > to) return [];

		const days = eachDayOfInterval({
			start: from,
			end: to,
		});

		return days.map((day) => format(day, 'yyyy-MM-dd'));
	}, [from, to]);

	//* Table Columns
	const columns = workingHourColumns(dateAccessor);

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
