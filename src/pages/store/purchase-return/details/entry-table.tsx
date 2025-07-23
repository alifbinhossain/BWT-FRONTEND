import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { purchaseReturnEntryColumns } from '../../_config/columns';
import { IPurchaseReturnDetails } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IPurchaseReturnDetails }> = ({ data }) => {
	const columns = purchaseReturnEntryColumns();

	return (
		<DataTableEntry
			title='Purchase Return Entry'
			columns={columns}
			data={data?.purchase_return_entry || []}
			defaultVisibleColumns={{ created_at: false, updated_at: false, created_by_name: false }}
		/>
	);
};

export default EntryTable;
