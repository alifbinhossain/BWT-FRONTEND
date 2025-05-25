import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { applyLeaveColumns } from '../_config/columns';
import { IApplyLeaveTableData } from '../_config/columns/columns.type';
import { useHrApplyLeave, useHrApplyLeaveByUUID } from '../_config/query';
import { IFieldVisitEmployee } from '../../_config/types';
import EmployeeInformation from './employee-information';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const FieldVisit = () => {
	const navigate = useNavigate();

	const { data, isLoading, url, deleteData, refetch } = useHrApplyLeave<IApplyLeaveTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Apply Leave', url, 'admin__leave_apply_leave'), [url]);

	const [selectedFieldVisit, setSelectedFieldVisit] = useState<IApplyLeaveTableData>();

	const { data: employeeInfo } = useHrApplyLeaveByUUID<IFieldVisitEmployee>(
		selectedFieldVisit?.employee_uuid as string
	);

	const handleCreate = () => navigate('/hr/apply-leave/add');

	const handleUpdate = (row: Row<IApplyLeaveTableData>) => {
		navigate(`/hr/apply-leave/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IApplyLeaveTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.employee_uuid,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IApplyLeaveTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.employee_uuid,
				checked: true,
			}))
		);
	};

	// Table Columns
	const columns = applyLeaveColumns();

	return (
		<div className='grid grid-cols-1 gap-8 xl:grid-cols-2'>
			<div>
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
						defaultVisibleColumns={{
							remarks: false,
							updated_at: false,
							created_by_name: false,
							created_at: false,
						}}
					>
						{renderSuspenseModals([
							<DeleteModal
								{...{
									deleteItem,
									setDeleteItem,
									url: '/hr/manual-entry',
									deleteData,
								}}
							/>,
							<DeleteAllModal
								{...{
									deleteItems,
									setDeleteItems,
									url: '/hr/manual-entry',
									deleteData,
								}}
							/>,
						])}
					</TableProvider>
				</PageProvider>
			</div>
			<div>
				{employeeInfo ? (
					<EmployeeInformation data={employeeInfo} />
				) : (
					<div className='flex size-full items-center justify-center rounded-md border bg-base-200 p-4 text-center'>
						<p>Select an employee to see their information</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default FieldVisit;
