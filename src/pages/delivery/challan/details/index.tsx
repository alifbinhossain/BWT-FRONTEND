import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

import { IChallanTableData } from '../../_config/columns/columns.type';
import { useDeliveryChallanByUUID } from '../../_config/query'; // TODO: replace with details query

import ChallanPdf from '../../../../components/pdf/challan';
import ChallanBIllPdf from '../../../../components/pdf/challan-bill';
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { user } = useAuth();
	const { data, isLoading } = useDeliveryChallanByUUID<IChallanTableData>(uuid as string);
	const fullURL = window.location.href;
	const slice = fullURL.split('w');
	const baseURl = slice[0];
	useEffect(() => {
		document.title = 'Challan Details';
	}, []);
	const [data2, setData] = useState('');
	const [data3, setData2] = useState('');

	useEffect(() => {
		const generatePdf = async () => {
			if (data && user) {
				(await ChallanPdf(data, user, baseURl))?.getDataUrl((dataUrl) => {
					setData(dataUrl);
				});
				(await ChallanBIllPdf(data, user, baseURl))?.getDataUrl((dataUrl) => {
					setData2(dataUrl);
				});
			}
		};
		generatePdf();
	}, [data, user, baseURl]);
	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<div className='flex gap-2'>
				<iframe src={data2} className='h-[40rem] w-full rounded-md border-none' />
				<iframe src={data3} className='h-[40rem] w-full rounded-md border-none' />
			</div>
			<Information data={(data || []) as IChallanTableData} />
			<EntryTable data={(data || []) as IChallanTableData} />
		</div>
	);
};

export default DetailsPage;
