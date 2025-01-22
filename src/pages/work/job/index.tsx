import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { jobColumns } from '../_config/columns';
import { IJobTableData } from '../_config/columns/columns.type';
import { useWorkJobs } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const Box = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useWorkJobs<IJobTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Job', url, 'work__job'), [url]);

	//* Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IJobTableData | null>(null);

	const handleUpdate = (row: Row<IJobTableData>) => {
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
	const handleDelete = (row: Row<IJobTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	//* Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	//* Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IJobTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.order_id,
				checked: true,
			}))
		);
	};

	//* Table Columns
	const columns = jobColumns();

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
