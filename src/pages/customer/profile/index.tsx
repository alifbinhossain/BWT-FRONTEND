import { useEffect } from 'react';
import { useHrUsersByUUID } from '@/pages/hr/_config/query';
import { useWorkOrderInfoByCustomer } from '@/pages/profile/config/query';
import useAuth from '@/hooks/useAuth';

import { IInfoTableData, IUserTableData } from '../_config/columns/columns.type';
import Information from './information';
import OrderTable from './order-info-table';

const DetailsPage = () => {
	const { user } = useAuth();
	const { data, isLoading, url, updateData, postData } = useHrUsersByUUID<IUserTableData>(user?.uuid as string);
	const { data: orderInfo } = useWorkOrderInfoByCustomer(user?.uuid as string);
	useEffect(() => {
		document.title = 'Customer Profile';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
	
			
			<div className='flex flex-col items-start gap-2 md:flex-row'>
				<div className='w-full md:w-1/4'>
					<Information
						data={(data || []) as IUserTableData}
						updateData={updateData}
						postData={postData}
						url={url}
					/>
				</div>
				<div className='w-full overflow-auto md:w-3/4'>
					<OrderTable data={(orderInfo || []) as IInfoTableData[]} />
				</div>
			</div>
		
	);
};

export default DetailsPage;
