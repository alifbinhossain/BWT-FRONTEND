import { useEffect } from 'react';
import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';
import { useWorkInfoOrderByUUID } from '@/pages/work/_config/query';
import { useParams } from 'react-router-dom';

import { IInfoTableData } from '../config/columns/columns.type';
import Information from './information';
import OrderCard from './order-card';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useWorkInfoOrderByUUID<IInfoTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Info Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='relative space-y-8 p-8'>
			<div className='flex flex-col gap-6 lg:flex-row'>
				<div className='left-0 top-0 h-fit w-full flex-shrink-0 lg:sticky lg:w-80'>
					<Information data={(data || []) as IInfoTableData} />
				</div>

				<div className='flex-grow'>
					<div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
						{data?.order_entry.map((item) => <OrderCard data={(item || []) as IOrderTableData} />)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailsPage;
