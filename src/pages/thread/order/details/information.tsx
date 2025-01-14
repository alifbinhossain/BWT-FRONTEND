import React, { useEffect, useState } from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IOrderDetails } from '../../_config/columns/columns.type';

const Information: React.FC<{ data: IOrderDetails }> = ({ data }) => {
	const [check, setCheck] = useState(true);
	const [checkSwatch, setCheckSwatch] = useState(true);

	useEffect(() => {
		data?.order_info_entry.map((item) => {
			if (Number(item?.company_price) <= 0 && Number(item?.party_price) <= 0) {
				setCheck(false);
			}
			if (!item?.swatch_approval_date) {
				setCheckSwatch(false);
			}
		});
	}, [data?.order_info_entry]);

	const orderDetails = (): ITableListItems => {
		return [
			{
				label: '0/N',
				value: data.order_number,
			},
			{
				label: 'Sample',
				value: (
					<StatusButton
						value={data.is_sample}
						buttonProps={{
							className: 'size-5 rounded-full',
						}}
					/>
				),
			},
			{
				label: 'Bill',
				value: (
					<StatusButton
						value={data.is_bill}
						buttonProps={{
							className: 'size-5 rounded-full',
						}}
					/>
				),
			},
			{
				label: 'Cash',
				value: (
					<StatusButton
						value={data.is_cash}
						buttonProps={{
							className: 'size-5 rounded-full',
						}}
					/>
				),
			},

			{
				label: 'PI No.',
				value: data.pi_numbers?.join(', '),
			},

			{ label: 'Remarks', value: data.remarks },

			{
				label: 'Created By',
				value: data.created_by_name,
			},
			{
				label: 'Delivery Date',
				value: formatDateTable(data.delivery_date),
			},

			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
		];
	};
	const buyerDetails = (): ITableListItems => {
		return [
			{
				label: 'Party',
				value: data.party_name,
			},

			{
				label: 'Buyer',
				value: data.buyer_name,
			},
			{
				label: 'Merchandiser',
				value: data.merchandiser_name,
			},
			{
				label: 'Factory',
				value: data.factory_name,
			},
			{
				label: 'Factory Address',
				value: data.factory_address,
			},
			{
				label: 'Marketing',
				value: data.marketing_name,
			},
		];
	};

	const renderButtons = () => {
		return [
			<StatusButton key={'swatch_approval_status'} value={check} />,
			<StatusButton key={'swatch_approval_status'} value={checkSwatch} />,
		];
	};

	return (
		<SectionContainer
			title={'Information'}
			contentClassName='grid grid-cols-1 lg:grid-cols-2'
			buttons={renderButtons()}
		>
			<TableList title='Order Details' items={orderDetails()} className='border-b lg:border-b-0 lg:border-r' />
			<TableList title='Buyer Details' items={buyerDetails()} />
		</SectionContainer>
	);
};

export default Information;
