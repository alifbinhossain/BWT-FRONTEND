import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { eachDayOfInterval, format } from 'date-fns';

import { IFormSelectOption } from '@/components/core/form/types';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import ReactSelect from '@/components/ui/react-select';

import { useOtherEmployees } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { individualReportColumns } from '../../_config/columns';
import { IIndividualReportTableData } from '../../_config/columns/columns.type';
import { useReportIndividual } from '../../_config/query';

const Info = () => {
	const [user, setUser] = useState('');
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const { data, isLoading, refetch } = useReportIndividual<IIndividualReportTableData[]>(
		user,
		format(from, 'yyyy/MM/dd'),
		format(to, 'yyyy/MM/dd')
	);
	const { data: employeeOptions } = useOtherEmployees<IFormSelectOption[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Report/Individual', '/hr/report/individual', 'report__individual_report'),
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
	const columns = individualReportColumns(dateAccessor);

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
						<ReactSelect
							placeholder='Select Employee'
							options={employeeOptions}
							value={employeeOptions?.find((option) => option.value === user)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
								control: (base) => ({ ...base, minWidth: 120 }),
							}}
							onChange={(e: any) => {
								setUser(e?.value);
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
