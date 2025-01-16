import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IPurchaseReturnDetails } from '../../_config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IPurchaseReturnDetails }> = ({ data }) => {
	console.log({
		data,
	});
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'id',
				value: data.id,
			},
			{
				label: 'purchase_id',
				value: data.purchase_id,
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<TableList items={renderItems()} />
		</SectionContainer>
	);
};

export default Information;
