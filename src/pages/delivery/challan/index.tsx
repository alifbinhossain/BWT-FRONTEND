import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { challanColumns } from '../_config/columns';
import { IChallanTableData } from '../_config/columns/columns.type';
import { type1FacetedFilters } from '../_config/columns/facetedFilters'; // TODO: Import faceted filters (Optional)
import { useDeliveryChallan } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const Challan = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useDeliveryChallan<IChallanTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Delivery/Challan', url, 'delivery__challan'), [url]);

	const handleCreate = () => navigate('/delivery/challan/add');
	const handleUpdate = (row: Row<IChallanTableData>) => {
		navigate(`/delivery/challan/update/${row.original.uuid}`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IChallanTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.id,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IChallanTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.id,
				checked: true,
			}))
		);
	};

	// Table Columns
	const columns = challanColumns();
	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}
				// TODO: Update facetedFilters (OPTIONAL)
				facetedFilters={type1FacetedFilters}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
					<DeleteAllModal
						{...{
							deleteItems,
							setDeleteItems,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Challan;
