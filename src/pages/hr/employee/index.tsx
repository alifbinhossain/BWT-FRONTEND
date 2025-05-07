import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import ReactSelect from '@/components/ui/react-select';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { employeeColumns } from '../_config/columns';
import { IEmployeeTableData, IPageAssign, IResetPassword } from '../_config/columns/columns.type';
import { useHrUsers } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const ResetPassword = lazy(() => import('./reset-password'));
const PageAssign = lazy(() => import('./page-assign'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const User = () => {
	const [status, setStatus] = useState<boolean | undefined>(undefined);
	const handleChangeStatus = () => setStatus(!status);
	const handleClearStatus = () => setStatus(undefined);
	const [type, setType] = useState('employee');
	const query = `status=${status}&user_type=employee`;

	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useHrUsers<IEmployeeTableData[]>(query);

	const pageInfo = useMemo(() => new PageInfo('Admin/Employee', url, 'admin__employee'), [url]);

	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const statusAccess = pageAccess.includes('click_status');
	const resetPasswordAccess = pageAccess.includes('click_reset_password');
	const pageAssignAccess = pageAccess.includes('click_page_assign');
	const typeOptions = [
		{
			label: 'Customer',
			value: 'customer',
		},
		{
			label: 'Employ',
			value: 'employee',
		},
		{
			label: 'Vendor',
			value: 'vendor',
		},
	];

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

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
			name: row?.original?.name,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IEmployeeTableData>[]) => {
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
	const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = useState(false);
	const [updateResetPasswordData, setUpdateResetPasswordData] = useState<IResetPassword | null>(null);

	// Reset Password Handler
	const handleResetPassword = (row: Row<IEmployeeTableData>) => {
		setUpdateResetPasswordData({
			uuid: row.original.uuid,
			name: row.original.name,
		});
		setIsOpenResetPasswordModal(true);
	};

	// Action Against Order Modal state
	const [isOpenPageAssignModal, setIsOpenPageAssignModal] = useState(false);
	const [updatePageAssignData, setUpdatePageAssignData] = useState<IPageAssign | null>(null);

	// Page Assign Handler
	const handlePageAssign = (row: Row<IEmployeeTableData>) => {
		setUpdatePageAssignData({
			uuid: row.original.uuid,
			name: row.original.name,
		});
		setIsOpenPageAssignModal(true);
	};

	// Status Handler
	const handleStatus = async (row: Row<IEmployeeTableData>) => {
		const status = Number(row?.original?.status) === 1 ? 0 : 1;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `/hr/user/status/${row?.original?.uuid}`,
			updatedData: { status, updated_at },
		});
	};
	// Table Columns
	const columns = employeeColumns({
		statusAccess,
		handleStatus,
		resetPasswordAccess,
		handleResetPassword,
		pageAssignAccess,
		handlePageAssign,
	});

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				advanceFilters={[
					{
						label: 'Status',
						state: status,
						onStateChange: handleChangeStatus,
						clear: handleClearStatus,
					},
				]}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url: '/hr/user',
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
							url: '/hr/user',
							deleteData,
						}}
					/>,
					<DeleteAllModal
						{...{
							deleteItems,
							setDeleteItems,
							url: '/hr/user',
							deleteData,
						}}
					/>,

					<ResetPassword
						{...{
							open: isOpenResetPasswordModal,
							setOpen: setIsOpenResetPasswordModal,
							updatedData: updateResetPasswordData,
							setUpdatedData: setUpdateResetPasswordData,
							updateData,
							url: `/hr/user/password/${updateResetPasswordData?.uuid}`,
						}}
					/>,
					<PageAssign
						{...{
							open: isOpenPageAssignModal,
							setOpen: setIsOpenPageAssignModal,
							updatedData: updatePageAssignData,
							setUpdatedData: setUpdatePageAssignData,
							updateData,
							url: `/hr/user/can-access/${updatePageAssignData?.uuid}`,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default User;
