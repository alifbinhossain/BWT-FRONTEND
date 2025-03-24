import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IChallanTableData } from '../../_config/columns/columns.type';
import { useDeliveryChallanByUUID } from '../../_config/query'; // TODO: replace with details query
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useDeliveryChallanByUUID<IChallanTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Challan Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IChallanTableData} />
			<EntryTable data={(data || []) as IChallanTableData} />
		</div>
	);
};

export default DetailsPage;
