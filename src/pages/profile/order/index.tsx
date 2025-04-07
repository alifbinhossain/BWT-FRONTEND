import { useEffect } from 'react';
import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';
import { useWorkInfoOrderByUUID } from '@/pages/work/_config/query';
import { useParams } from 'react-router-dom';

import { IInfoTableData } from '../config/columns/columns.type';
import Information from './information';
import Order from './orders';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useWorkInfoOrderByUUID<IInfoTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Info Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='m-2 space-y-8'>
			<div className='m-2'>
				<Information data={(data || []) as IInfoTableData} />
			</div>

			{data?.order_entry.map((item) => <Order data={(item || []) as IOrderTableData} />)}
		</div>
	);
};

export default DetailsPage;
