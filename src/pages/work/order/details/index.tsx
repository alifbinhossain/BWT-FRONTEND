import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { IOrderTableData } from '../../_config/columns/columns.type';
import { useWorkOrderByDetails } from '../../_config/query';
import Information from './information';
import EntryTable from './process';
import Transfer from './transfer';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading, imageUpdateData } = useWorkOrderByDetails<IOrderTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IOrderTableData} updateData={imageUpdateData} />
			{data?.is_proceed_to_repair && (
				<Transfer data={(data || []) as IOrderTableData} isLoading={isLoading} order_uuid={data?.uuid} />
			)}
			{data?.is_proceed_to_repair && <EntryTable data={(data || []) as IOrderTableData} isLoading={isLoading} />}
		</div>
	);
};

export default DetailsPage;
