import { useEffect } from 'react';
import { useHrEmployeeFieldVisitInfoByUUID } from '@/pages/hr/_config/query';
import { IFieldVisitEmployee } from '@/pages/hr/_config/types';
import { useParams } from 'react-router-dom';

import EmployeeInformation from '../employee-information';

const DetailsPage = () => {
	const { uuid } = useParams();

	const { data: employeeInfo, isLoading } = useHrEmployeeFieldVisitInfoByUUID<IFieldVisitEmployee>(uuid as string);

	useEffect(() => {
		document.title = 'Apply Leave - Employee Details';
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <EmployeeInformation data={employeeInfo || ({} as IFieldVisitEmployee)} />;
};

export default DetailsPage;
