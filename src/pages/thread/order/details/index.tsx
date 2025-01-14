import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IOrderDetails } from '../../_config/columns/columns.type';
import { useThreadOrderInfoDetailsByUUID } from '../../_config/query';
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading } = useThreadOrderInfoDetailsByUUID<IOrderDetails>(id as string);

	useEffect(() => {
		document.title = 'Thread Order Info';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={data as IOrderDetails} />
			<EntryTable data={data?.order_info_entry || []} />
		</div>
	);
};

export default DetailsPage;
