import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import {purchaseReturnEntryColumns } from '../../_config/columns';
import { IPurchaseReturnDetails } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IPurchaseReturnDetails }> = ({ data }) => {
	const columns = purchaseReturnEntryColumns();

	return <DataTableEntry title='Purchase Entry' columns={columns} data={data?.purchase_return_entry || []} />;
};

export default EntryTable;
