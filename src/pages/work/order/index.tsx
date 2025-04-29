import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { orderColumns } from '../_config/columns';
import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis, useWorkOrder, useWorkRepairing } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const Order = () => {
	const navigate = useNavigate();

	const pageAccess = useAccess('work__order') as string[];

	const { invalidateQuery: invalidateDiagnosis } = useWorkDiagnosis();
	const { invalidateQuery: invalidateRepairing } = useWorkRepairing();

	const actionTrxAccess = pageAccess.includes('click_trx');
	const actionProceedToRepair = pageAccess.includes('click_proceed_to_repair');
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useWorkOrder<IOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Order', url, 'work__order'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IOrderTableData | null>(null);

	const handleUpdate = (row: Row<IOrderTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IOrderTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IOrderTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.order_id,
				checked: true,
			}))
		);
	};
	const handleProceedToRepair = async (row: Row<IOrderTableData>) => {
		const is_proceed_to_repair = !row?.original?.is_proceed_to_repair;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `/work/order/${row?.original?.uuid}`,
			updatedData: { is_proceed_to_repair, updated_at },
		});
		invalidateDiagnosis();
		invalidateRepairing();
	};

	// Table Columns

	const handleAgainstTrx = (row: Row<IOrderTableData>) => {
		navigate(`/work/transfer-section/${row.original.info_uuid}/${null}/${row.original.uuid}`);
	};
	const columns = orderColumns({ actionTrxAccess, actionProceedToRepair, handleAgainstTrx, handleProceedToRepair });

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
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Order;
