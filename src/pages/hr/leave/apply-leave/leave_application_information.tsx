import { format } from 'date-fns';

import TableList, { ITableListItems } from '@/components/others/table-list';

import { ILeaveEmployee } from '../_config/types';

const LeaveApplicationInformation: React.FC<{ data: ILeaveEmployee }> = ({ data }) => {
	const { leave_application_information } = data;
	const format_from_date = format(leave_application_information.from_date, 'dd MMM yyyy');
	const format_to_date = format(leave_application_information.to_date, 'dd MMM yyyy');
	leave_application_information.date_range = format_from_date + ' to ' + format_to_date;

	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Category',
				value: leave_application_information.leave_category_name,
			},
			{
				label: 'Application Type',
				value: 'Leave Apply',
			},
			{ label: 'Date Range', value: leave_application_information.date_range },
			{
				label: 'Leave Type',
				value: leave_application_information.type,
			},
			{ label: 'Reason', value: leave_application_information.reason },
			{ label: 'Status', value: leave_application_information.approval },
		];
	};
	return (
		<div className='space-y-4'>
			{data.leave_application_information && (
				<TableList isSmallTitle={true} title='Leave Application Information' items={renderItems()} />
			)}
		</div>
	);
};

export default LeaveApplicationInformation;
