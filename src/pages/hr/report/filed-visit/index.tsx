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
import { filedVisitColumns } from './_config/columns';
import { IFieldVisitTableData } from './_config/columns/columns.type';
import { useReportFieldVisit } from './_config/query';
import { approvalOptions } from './utills';

const Info = () => {
	const [from, setFrom] = useState<Date | string>(
		startOfMonth(`${getYear(new Date())}/${getMonth(new Date()) + 1}/01`)
	);
	const [to, setTo] = useState<Date | string>(new Date());
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [approval, setApproval] = useState(undefined);
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const { data, url, isLoading, refetch } = useReportFieldVisit<IFieldVisitTableData[]>(
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd'),
		status
	);

	const pageInfo = useMemo(() => new PageInfo('Report/FieldVisit', url, 'report__field_visit'), []);

	//* Table Columns
	const columns = filedVisitColumns();

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
						<ReactSelect
							placeholder='Select Status'
							options={approvalOptions}
							value={approvalOptions.find((option) => option.value === status)}
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
