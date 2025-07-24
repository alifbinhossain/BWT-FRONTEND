import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { IStockActionTrx, ITransferTableData } from '@/pages/store/_config/columns/columns.type';
import { useStoreOrderTransfers } from '@/pages/store/_config/query';
import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

// Ensure transferColumns uses the correct ITransferTableData type from store/_config/columns/columns.type
import { transferColumns } from '@/pages/store/_config/columns';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Transfer: React.FC<{ data?: IOrderTableData; isLoading?: any; order_uuid?: string }> = ({
	data,
	isLoading,
	order_uuid,
}) => {
	const { url, deleteData, postData, updateData, refetch } = useStoreOrderTransfers<ITransferTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Repairing Item', url, 'work__process'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const [updatedData, setUpdatedData] = useState<IStockActionTrx | null>(null);

	const handleUpdate = (row: Row<ITransferTableData>) => {
		setUpdatedData({
			uuid: row.original.uuid,
			name: row.original.order_id,
			max_quantity: row.original.max_quantity,
			product_uuid: row.original.product_uuid,
			warehouse_uuid: row.original.warehouse_uuid,
		});

		setIsOpenAddModal(true);
	};
	const handleCreate = () => {
		setIsOpenAddModal(true);
	};
	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<ITransferTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	// Table Columns
	const columns = transferColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data?.product_transfer ?? []}
				isLoading={isLoading}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleCreate={handleCreate}
				handleRefetch={refetch}
				defaultVisibleColumns={{ updated_at: false, created_by_name: false }}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							updateData,
							postData,
							order_uuid: order_uuid ?? '',
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
							needRefresh: true,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Transfer;
