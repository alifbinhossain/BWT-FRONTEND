import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';

import { IFieldVisitEmployee } from '../_config/types';
import EmployeeProfile from '../../../lib/component/employee-profile';

const EmployeeInformation: React.FC<{ data: IFieldVisitEmployee }> = ({ data }) => {
	return (
		<div className='space-y-4'>
			<EmployeeProfile data={data} />
		</div>
	);
};

export default EmployeeInformation;
