import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IOrderTableData } from '../../_config/columns/columns.type';
import { useWorkOrderByDetails } from '../../_config/query';
import Information from './information';
import EntryTable from './process';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useWorkOrderByDetails<IOrderTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IOrderTableData} />
			{((data?.is_diagnosis_need && data?.diagnosis?.is_proceed_to_repair) || !data?.is_diagnosis_need) && (
				<EntryTable data={(data || []) as IOrderTableData} />
			)}
		</div>
	);
};

export default DetailsPage;
