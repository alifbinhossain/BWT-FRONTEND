import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IOrderTableData } from '../../_config/columns/columns.type';

const Information: React.FC<{ data: IOrderTableData }> = ({ data }) => {
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.order_id,
			},
			{ label: 'Vendor', value: data.user_name },
			{ label: 'Branch', value: data.user_uuid },
			{
				label: 'Date',
				value: formatDateTable(data.created_at),
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
		<SectionContainer title={''}>
			<TableList items={renderItems()} />
		</SectionContainer>
	);
};

export default Information;
