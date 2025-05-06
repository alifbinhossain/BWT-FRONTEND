import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IChallanTableData } from '../../_config/columns/columns.type';
import { useDeliveryChallanByUUID } from '../../_config/query'; // TODO: replace with details query

import ChallanPdf from '../../../../components/pdf/item-requstion';
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useDeliveryChallanByUUID<IChallanTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Challan Details';
	}, []);
	const [data2, setData] = useState('');

	useEffect(() => {
		if (data) {
			ChallanPdf(data)?.getDataUrl((dataUrl) => {
				setData(dataUrl);
			});
		}
	}, [data]);
	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<iframe src={data2} className='h-[40rem] w-full rounded-md border-none' />
			<Information data={(data || []) as IChallanTableData} />
			<EntryTable data={(data || []) as IChallanTableData} />
		</div>
	);
};

export default DetailsPage;
