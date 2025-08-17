import { differenceInDays, format } from 'date-fns';

import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';
import { Column } from '@/lib/component/type';

import { ILeaveEmployee } from '../_config/types';

const LastFiveLeaveApplications: React.FC<{ data: ILeaveEmployee }> = ({ data }) => {
	const { last_five_leave_applications } = data;
	const last_five_leave_data = last_five_leave_applications.map((item: any) => {
		const format_from_date = format(item?.from_date, 'dd MMM yyyy');
		const format_to_date = format(item?.to_date, 'dd MMM yyyy');
		return {
			...item,
			date_range: format_from_date + ' to ' + format_to_date,
			number_of_days: differenceInDays(format_to_date, format_from_date) + 1,
		};
	});
	const LastFiveLeaveColumns: Column[] = [
		{
			accessoriesKey: 'leave_category_name',
			header: 'Category',
			type: 'text',
		},
		{
			accessoriesKey: 'date_range',
			header: 'Date Range',
			type: 'text',
		},
		{
			accessoriesKey: 'number_of_days',
			header: 'Number of Days',
			type: 'text',
		},
		{
			accessoriesKey: 'created_by_name',
			header: 'Created By',
			type: 'profile',
		},
	];
	return (
		<div className='space-y-4'>
			{data.last_five_leave_applications && (
				<TableWithoutTitleBackground
					title='Last 5 Leaves'
					data={last_five_leave_data}
					columns={LastFiveLeaveColumns}
				/>
			)}
		</div>
	);
};

export default LastFiveLeaveApplications;
