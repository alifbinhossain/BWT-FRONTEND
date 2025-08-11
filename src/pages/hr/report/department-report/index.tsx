import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { eachDayOfInterval, format } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import ReactSelect from '@/components/ui/react-select';

import { useOtherDepartment } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { departmentReportColumns } from '../../_config/columns';
import { IDepartmentReportTableData } from '../../_config/columns/columns.type';
import { useReportDepartment } from '../../_config/query';

const Info = () => {
	const [department, setDepartment] = useState('');
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const { data, isLoading, refetch } = useReportDepartment<IDepartmentReportTableData[]>(
		department,
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd')
	);
	const { data: departmentOptions } = useOtherDepartment<IFormSelectOption[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Report/Department', '/hr/report/department', 'report__department_report'),
		[]
	);

	const dateAccessor = useMemo(() => {
		if (!from || !to || from > to) return [];

		const days = eachDayOfInterval({
			start: from,
			end: to,
		});

		return days.map((day) => format(day, 'yyyy-MM-dd'));
	}, [from, to]);

	//* Table Columns
	const columns = departmentReportColumns(dateAccessor);

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
						<DateTimePicker className='h-[2rem] w-fit' onChange={setFrom} value={from} />
						<DateTimePicker className='h-[2rem] w-fit' onChange={setTo} value={to} />
					</>
				}
			></TableProvider>
		</PageProvider>
	);
};

export default Info;
