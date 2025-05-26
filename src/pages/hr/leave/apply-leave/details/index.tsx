import { useEffect } from 'react';
import { useHrEmployeeFieldVisitInfoByUUID } from '@/pages/hr/_config/query';
import { useParams } from 'react-router-dom';

import { ILeaveEmployee } from '../../_config/types';
import EmployeeInformation from '../employee-information';

const DetailsPage = () => {
	const { uuid } = useParams();

	const { data: employeeInfo, isLoading } = useHrEmployeeFieldVisitInfoByUUID<ILeaveEmployee>(uuid as string);

	useEffect(() => {
		document.title = 'Apply Leave - Employee Details';
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <EmployeeInformation data={employeeInfo || ({} as ILeaveEmployee)} />;
};

export default DetailsPage;
