import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { infoColumns } from '../_config/columns';
import { IInfoTableData } from '../_config/columns/columns.type';

const OrderTable: React.FC<{ data: IInfoTableData[] }> = ({ data }) => {
	const columns = infoColumns();

	return (
		<DataTableEntry
			title='Order History'
			columns={columns}
			data={data || []}
			defaultVisibleColumns={{ updated_at: false, created_by_name: false }}
		/>
	);
};

export default OrderTable;
