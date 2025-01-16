import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IPurchaseReturnDetails } from '../../_config/columns/columns.type';
import { useStorePurchaseReturnByUUID } from '../../_config/query'; // TODO: replace with details query
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useStorePurchaseReturnByUUID<IPurchaseReturnDetails>(uuid as string);

	useEffect(() => {
		document.title = 'Purchase Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IPurchaseReturnDetails} />
			<EntryTable data={(data || []) as IPurchaseReturnDetails} />
		</div>
	);
};

export default DetailsPage;
