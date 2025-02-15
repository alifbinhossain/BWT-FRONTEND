import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { orderColumns } from '../_config/columns';
import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkJobs } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const Box = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useWorkJobs<IOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Order', url, 'work__order'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_trx');

	//* Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IOrderTableData | null>(null);

	const handleUpdate = (row: Row<IOrderTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	//* Delete Modal state
	//* Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//* Single Delete Handler
	const handleDelete = (row: Row<IOrderTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	//* Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	//* Delete All Row Handlers
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
	const handleAgainstTrx = (row: Row<IOrderTableData>) => {
		navigate(`/work/transfer-section/${row.original.uuid}/${row.original.uuid}`);
	};
	//* Table Columns
	const columns = orderColumns({ actionTrxAccess, handleAgainstTrx });

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

export default Box;
