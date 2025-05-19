import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { subDepartmentColumns } from '../_config/columns';
import { ISubDepartmentTableData } from '../_config/columns/columns.type';
import { useHrSubDepartments } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useHrSubDepartments<ISubDepartmentTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Sub-Departments', url, 'admin__sub_department'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const statusAccess = pageAccess.includes('click_status');
	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ISubDepartmentTableData | null>(null);

	const handleUpdate = (row: Row<ISubDepartmentTableData>) => {
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
	const handleDelete = (row: Row<ISubDepartmentTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	const handleStatus = async (row: Row<ISubDepartmentTableData>) => {
		const status = row?.original?.status ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { status, updated_at },
		});
	};
	// Table Columns
	const columns = subDepartmentColumns(statusAccess, handleStatus);

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

export default Designation;
