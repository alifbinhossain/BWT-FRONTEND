import { format } from 'date-fns';

import TableList, { ITableListItems } from '@/components/others/table-list';

import { IFieldVisitEmployee } from '../_config/types';
import EmployeeProfile from '@/lib/component/profile';

const FiledVisitInformation: React.FC<{ data: IFieldVisitEmployee }> = ({ data }) => {
	const format_from_date = format(data.start_date, 'dd MMM yyyy');
	const format_to_date = format(data.end_date, 'dd MMM yyyy');
	data.date_range = format_from_date + ' to ' + format_to_date;

	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Date Range',
				value: data.date_range,
			},
			{
				label: 'Reason',
				value: data.reason,
			},
			{ label: 'Date Range', value: data.date_range },
			{
				label: 'Entry',
				value: format_from_date,
			},
			{
				label: 'Exit',
				value: format_to_date,
			},
			{ label: 'Reason', value: data.reason },
			{ label: 'Status', value: data.approval },
			{
				label: 'Applied By',
				value: (
					<EmployeeProfile
						data={{
							name: data.created_by_name,
							designation: data.created_by_designation,
							department: data.created_by_department,
						}}
					/>
				),
			},
		];
	};
	return (
		<div className='space-y-4'>
			{data && <TableList isSmallTitle={true} title='Leave Application Information' items={renderItems()} />}
		</div>
	);
};

export default FiledVisitInformation;
