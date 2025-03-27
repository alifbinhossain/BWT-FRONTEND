import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { productColumns } from '../_config/columns';
import { IProductTableData, IStockActionTrx } from '../_config/columns/columns.type';
import { useStoreProducts } from '../_config/query';

const AgainstTrx = lazy(() => import('./trx'));
const OrderAgainstTrx = lazy(() => import('./trx-against-order'));
const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const Product = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useStoreProducts<IProductTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Store/Product', url, 'store__product'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_trx');
	const actionOrderAgainstTrxAccess = pageAccess.includes('click_order_trx');
	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IProductTableData | null>(null);

	const handleUpdate = (row: Row<IProductTableData>) => {
		setUpdatedData({ ...row.original });
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IProductTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IProductTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.name,
				checked: true,
			}))
		);
	};
	// Action Trx Modal state
	const [isOpenActionTrxModal, setIsOpenActionTrxModal] = useState(false);
	const [updateActionTrxData, setUpdateActionTrxData] = useState<IStockActionTrx | null>(null);

	const handleAgainstTrx = (row: Row<IProductTableData>) => {
		setUpdateActionTrxData({
			uuid: row.original.uuid,
			name: row.original.name,
		});
		setIsOpenActionTrxModal(true);
	};
	// Action Trx Modal state
	const [isOpenActionOrderAgainstTrxModal, setIsOpenActionOrderAgainstTrxModal] = useState(false);
	const [updateActionOrderAgainstTrxData, setUpdateActionOrderAgainstTrxData] = useState<IStockActionTrx | null>(
		null
	);

	const handleOrderAgainstWarehouse1Trx = (row: Row<IProductTableData>) => {
		setUpdateActionOrderAgainstTrxData({
			uuid: row.original.uuid,
			name: row.original.name,
			max_quantity: row.original.warehouse_1,
			warehouse_uuid: row.original.warehouse_1_uuid,
		});
		
		setIsOpenActionOrderAgainstTrxModal(true);
	};
	const handleOrderAgainstWarehouse2Trx = (row: Row<IProductTableData>) => {
		setUpdateActionOrderAgainstTrxData({
			uuid: row.original.uuid,
			name: row.original.name,
			max_quantity: row.original.warehouse_2,
			warehouse_uuid: row.original.warehouse_2_uuid,
		});
		setIsOpenActionOrderAgainstTrxModal(true);
	};
	const handleOrderAgainstWarehouse3Trx = (row: Row<IProductTableData>) => {
		setUpdateActionOrderAgainstTrxData({
			uuid: row.original.uuid,
			name: row.original.name,
			max_quantity: row.original.warehouse_3,
			warehouse_uuid: row.original.warehouse_3_uuid,
		});
		setIsOpenActionOrderAgainstTrxModal(true);
	};

	// Table Columns
	const columns = productColumns({
		actionTrxAccess,
		actionOrderAgainstTrxAccess,
		handleAgainstTrx,
		handleOrderAgainstWarehouse1Trx,
		handleOrderAgainstWarehouse2Trx,
		handleOrderAgainstWarehouse3Trx,
	});

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
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

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
					<AgainstTrx
						{...{
							open: isOpenActionTrxModal,
							setOpen: setIsOpenActionTrxModal,
							updatedData: updateActionTrxData,
							setUpdatedData: setUpdateActionTrxData,
							postData,
							url: '/store/internal-transfer',
						}}
					/>,
					<OrderAgainstTrx
						{...{
							open: isOpenActionOrderAgainstTrxModal,
							setOpen: setIsOpenActionOrderAgainstTrxModal,
							updatedData: updateActionOrderAgainstTrxData,
							setUpdatedData: setUpdateActionOrderAgainstTrxData,
							postData,
							url: '/store/product-transfer',
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Product;
