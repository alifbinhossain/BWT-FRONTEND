import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { challanEntryColumns } from '../../_config/columns';
import { IChallanTableData } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IChallanTableData }> = ({ data }) => {
	const columns = challanEntryColumns();

	return <DataTableEntry title='Challan Entry' columns={columns} data={data?.challan_entries || []} />;
};

export default EntryTable;
