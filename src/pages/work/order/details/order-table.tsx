import React from 'react';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import DataTableEntry from '@core/data-table/entry';

import { orderColumns } from '../../_config/columns';
import { IInfoTableData } from '../../_config/columns/columns.type';

const OrderTable: React.FC<{ data: IInfoTableData }> = ({ data }) => {
	const navigate = useNavigate();

	const pageAccess = useAccess('work__order') as string[];

	const actionTrxAccess = pageAccess.includes('click_trx');

	const handleAgainstTrx = (row: Row<IInfoTableData>) => {
		navigate(`/work/transfer-section/${null}/${row.original.uuid}`);
	};
	const columns = orderColumns({ actionTrxAccess, handleAgainstTrx });

	return <DataTableEntry title='Order' columns={columns} data={data?.order_entry || []} />;
};

export default OrderTable;
