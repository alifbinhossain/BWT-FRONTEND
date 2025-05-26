import { TypeIcon } from 'lucide-react';

import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';

import { ILeaveEmployee } from '../_config/types';
import Card from '../../../../lib/component/card';
import EmployeeProfile from '../../../../lib/component/employee-profile';

const EmployeeInformation: React.FC<{ data: ILeaveEmployee }> = ({ data }) => {
	const columns = [
		{
			accessoriesKey: 'name',
			header: 'Name',
			type: 'text',
		},
		{
			accessoriesKey: 'used_leave_days',
			header: 'Used Leave Days',
			type: 'text',
		},
		{
			accessoriesKey: 'remaining_leave_days',
			header: 'Remaining Leave Days',
			type: 'text',
		},
		{
			accessoriesKey: 'maximum_number_of_allowed_leaves',
			header: 'Balance',
			type: 'text',
		},
	];
	return (
		<div className='space-y-4'>
			<EmployeeProfile data={data}>
				<Card
					icon={<TypeIcon className='h-4 w-4 text-primary' />}
					label='Leave Policy'
					value={data?.leave_policy_name || 'N/A'}
				/>
			</EmployeeProfile>
			{data.remaining_leave_information && (
				<TableWithoutTitleBackground
					title='Remaining Leaves Information'
					data={data.remaining_leave_information}
					columns={columns}
				/>
			)}
		</div>
	);
};

export default EmployeeInformation;
