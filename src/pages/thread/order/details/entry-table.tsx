import React from 'react';
import useAccess from '@/hooks/useAccess';

import DataTableEntry from '@core/data-table/entry';

import { orderEntryColumns } from '../../_config/columns';
import { IOrderDetailsEntry } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IOrderDetailsEntry[] }> = ({ data }) => {
	const pageAccess = useAccess('thread__order_info_in_details') as string[];
	const showPriceAccess = pageAccess.includes('show_price');
	const columns = orderEntryColumns({ showPriceAccess });

	return <DataTableEntry title='Entries' columns={columns} data={data || []} />;
};

export default EntryTable;
