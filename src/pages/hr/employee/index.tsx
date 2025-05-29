import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { IEmployeeTableData } from '../_config/columns/columns.type';
import { useHrEmployees } from '../_config/query';
import { employeeColumns } from './_config/columns';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const AddOrUpdateDevice = lazy(() => import('./add-or-update-device'));

const DeleteModal = lazy(() => import('@core/modal/delete'));

const User = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useHrEmployees<IEmployeeTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Admin/Employee', url, 'admin__employee'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [isOpenDeviceModal, setIsOpenDeviceModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IEmployeeTableData | null>(null);
	const handleUpdate = (row: Row<IEmployeeTableData>) => {
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
	const handleDelete = (row: Row<IEmployeeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.employee_name,
		});
	};

	const [employeeData, setEmployeeData] = useState<IEmployeeTableData | null>(null);
	const handleDevices = async (row: Row<IEmployeeTableData>) => {
		setEmployeeData(row.original);
		setIsOpenDeviceModal(true);
	};

	// Table Columns
	const columns = employeeColumns({ handleDevices });

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
				defaultVisibleColumns={{
					remarks: false,
					updated_at: false,
					created_by_name: false,
					created_at: false,
				}}
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
					<AddOrUpdateDevice
						{...{
							url: '/hr/device-permission',
							open: isOpenDeviceModal,
							setOpen: setIsOpenDeviceModal,
							employeeData,
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

export default User;
