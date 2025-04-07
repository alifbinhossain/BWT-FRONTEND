import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

import { IInfoTableData, IUserTableData } from './config/columns/columns.type';
import { useHrUsersByUUID, useWorkOrderInfoByCustomer } from './config/query';
import Information from './information';
import OrderTable from './order-info-table';

const DetailsPage = () => {
	const { user } = useAuth();
	const { data, isLoading, url, updateData, postData } = useHrUsersByUUID<IUserTableData>(user?.uuid as string);
	const { data: orderInfo } = useWorkOrderInfoByCustomer(user?.uuid as string);
	useEffect(() => {
		document.title = 'Profile';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IUserTableData} updateData={updateData} postData={postData} url={url} />
			<OrderTable data={(orderInfo || []) as IInfoTableData[]} />
		</div>
	);
};

export default DetailsPage;
