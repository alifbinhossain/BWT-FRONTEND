import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHrEmployeeFieldVisitInfoByUUID } from '../../_config/query';
import { IFieldVisitEmployee } from '../../_config/types';
import EmployeeInformation from '../employee-information';

const DetailsPage = () => {
	const { uuid } = useParams();

	const { data: employeeInfo, isLoading } = useHrEmployeeFieldVisitInfoByUUID<IFieldVisitEmployee>(uuid as string);

	useEffect(() => {
		document.title = 'Field Visit - Employee Details';
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <EmployeeInformation data={employeeInfo || ({} as IFieldVisitEmployee)} />;
};

export default DetailsPage;
