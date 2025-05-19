import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { employeeTypeColumns } from '../_config/columns';
import { IEmployeeTypeTableData } from '../_config/columns/columns.type';
import { useHrEmployeeTypes } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useHrEmployeeTypes<IEmployeeTypeTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Employee Type', url, 'admin__employee_type'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const statusAccess = pageAccess.includes('click_status');

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IEmployeeTypeTableData | null>(null);

	const handleUpdate = (row: Row<IEmployeeTypeTableData>) => {
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
	const handleDelete = (row: Row<IEmployeeTypeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};
	const handleStatus = async (row: Row<IEmployeeTypeTableData>) => {
		const status = row?.original?.status ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { status, updated_at },
		});
	};
	// Table Columns
	const columns = employeeTypeColumns(statusAccess, handleStatus);

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
