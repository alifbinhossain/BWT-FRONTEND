import { useState } from 'react';
import { useHrPunchLogsPerDay } from '@/pages/hr/_config/query';
import { format, subDays } from 'date-fns';

import DataTableEntry from '@/components/core/data-table/entry';
import { DateRangePicker } from '@/components/ui/date-range-picker';

import { punchLogPerDayColumns } from './_config/columns';
import { IPunchLogsPerDayTableData } from './_config/columns/columns.type';

const AttendanceTable: React.FC<{
	employeeId: string;
}> = ({ employeeId }) => {
	const [fromDate, setFromDate] = useState(format(subDays(new Date(), 20), 'yyyy-MM-dd'));
	const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const { data, isLoading } = useHrPunchLogsPerDay<IPunchLogsPerDayTableData[]>(
		employeeId,
		`from_date=${fromDate}&to_date=${toDate}`
	);

	if (isLoading) return <div>Loading...</div>;

	const columns = punchLogPerDayColumns();

	return (
		<div>
			<DataTableEntry
				title='Attendance Table'
				data={data || []}
				columns={columns}
				toolbarOptions={['all-filter', 'view', 'export-csv']}
				enableDefaultColumns={false}
				otherToolBarComponents={
					<DateRangePicker
						initialDateFrom={new Date(fromDate)}
						initialDateTo={new Date(toDate)}
						align={'center'}
						onUpdate={({ range }) => {
							setFromDate(format(range.from, 'yyyy-MM-dd'));
							setToDate(format(range.to!, 'yyyy-MM-dd'));
						}}
						onClear={() => {
							setFromDate(format(subDays(new Date(), 20), 'yyyy-MM-dd'));
							setToDate(format(new Date(), 'yyyy-MM-dd'));
						}}
					/>
				}
			/>
		</div>
	);
};

export default AttendanceTable;
