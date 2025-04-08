import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { infoColumns } from './config/columns';
import { IInfoTableData } from './config/columns/columns.type';

const OrderTable: React.FC<{ data: IInfoTableData[] }> = ({ data }) => {
	const columns = infoColumns();

	return <DataTableEntry title='Order History' columns={columns} data={data || []} />;
};

export default OrderTable;
