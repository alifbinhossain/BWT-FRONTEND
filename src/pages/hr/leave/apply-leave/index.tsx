import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProviderSSR } from '@/context';
import { IPaginationQuery } from '@/types';
import { Separator } from '@radix-ui/react-select';
import { Row } from '@tanstack/react-table';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { applyLeaveColumns } from '../_config/columns';
import { IApplyLeaveTableData } from '../_config/columns/columns.type';
import { applyLeaveFilters } from '../_config/columns/facetedFilters';
import { useHrApplyLeave2, useHrEmployeeLeaveDetails } from '../_config/query';
import { ILeaveEmployee } from '../_config/types';
import EmployeeInformation from './employee-information';
import LeaveApplicationInformation from './leave_application_information';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const FieldVisit = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const params = {} as IPaginationQuery;
	searchParams.forEach((value, key) => ((params as any)[key] = value));

	const { data, pagination, isLoading, url, deleteData, refetch } = useHrApplyLeave2<IApplyLeaveTableData[]>(params);

	const pageInfo = useMemo(() => new PageInfo('HR/Apply Leave', url, 'admin__leave_apply_leave'), [url]);

	const [selectedFieldVisit, setSelectedFieldVisit] = useState<IApplyLeaveTableData>();

	const { data: employeeInfo } = useHrEmployeeLeaveDetails<ILeaveEmployee>(
		selectedFieldVisit?.employee_uuid as string,
		selectedFieldVisit?.uuid as string
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
	const columns = applyLeaveColumns({ selectedFieldVisit, setSelectedFieldVisit });

	return (
		<div className='flex gap-2'>
			<div>
				<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
					<TableProviderSSR
						start_date={params.start_date ? new Date(params.start_date) : undefined}
						end_date={params.end_date ? new Date(params.end_date) : undefined}
						title={pageInfo.getTitle()}
						pagination={pagination!}
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
						filterOptions={applyLeaveFilters}
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
					</TableProviderSSR>
				</PageProvider>
			</div>
			<div className='w-full rounded-md border bg-base-200 p-4'>
				{employeeInfo ? (
					<div>
						<EmployeeInformation data={employeeInfo} />
						<Separator className='my-4' />
						<LeaveApplicationInformation data={employeeInfo} />
					</div>
				) : (
					<div className='flex w-full items-center justify-center rounded-md border bg-white p-4 text-center'>
						<p>Select an employee to see their information</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default FieldVisit;
