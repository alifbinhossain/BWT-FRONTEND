import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { roasterColumns } from '../_config/columns';
import { IRoasterColumnsType } from '../_config/columns/columns.type';
import { useHrRoaster } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const ManualEntry = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useHrRoaster<IRoasterColumnsType[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Roaster', url, 'admin__shifts_roasters'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IRoasterColumnsType | null>(null);

	const handleUpdate = (row: Row<IRoasterColumnsType>) => {
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
	const handleDelete = (row: Row<IRoasterColumnsType>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.shift_name + '-' + row?.original?.shift_group_name,
		});
	};

	// Table Columns
	const columns = roasterColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				// handleUpdate={handleUpdate}
				// handleDelete={handleDelete}
				handleRefetch={refetch}
				defaultVisibleColumns={{updated_at: false, created_by_name: false, actions: false }}
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
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default ManualEntry;
