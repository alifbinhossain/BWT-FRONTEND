import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { IPunchLogTableData } from '../_config/columns/columns.type';
import { useHrPunchLogs } from '../_config/query';
import { punchLogColumns } from './_config/columns';

const AddOrUpdate = lazy(() => import('./add-or-update'));

const DeleteModal = lazy(() => import('@core/modal/delete'));

const User = () => {
	const [status, setStatus] = useState<boolean | undefined>(undefined);
	const handleChangeStatus = () => setStatus(!status);
	const handleClearStatus = () => setStatus(undefined);

	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useHrPunchLogs<IPunchLogTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Punch Log', url, 'admin__punch_log'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IPunchLogTableData | null>(null);
	const handleUpdate = (row: Row<IPunchLogTableData>) => {
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
	const handleDelete = (row: Row<IPunchLogTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.employee_name,
		});
	};

	// Table Columns
	const columns = punchLogColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				// handleCreate={handleCreate}
				// handleUpdate={handleUpdate}
				// handleDelete={handleDelete}
				handleRefetch={refetch}
				defaultVisibleColumns={{
					updated_at: false,
					created_by_name: false,
				}}
			>
				{/* {renderSuspenseModals([
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
					/>
				])} */}
			</TableProvider>
		</PageProvider>
	);
};

export default User;
