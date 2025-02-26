import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IInfoTableData } from '../../_config/columns/columns.type';
import { useWorkInfoByUUID } from '../../_config/query';
import Information from './information';
import OrderTable from './order-table';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useWorkInfoByUUID<IInfoTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Info Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IInfoTableData} />
			<OrderTable data={(data || []) as IInfoTableData} />
		</div>
	);
};

export default DetailsPage;
