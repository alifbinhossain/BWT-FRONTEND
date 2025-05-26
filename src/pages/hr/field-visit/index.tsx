import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { fieldVisitColumns } from '../_config/columns';
import { IManualEntryTableData } from '../_config/columns/columns.type';
import { useHrEmployeeFieldVisitInfoByUUID, useHrManualEntry, useHrManualEntry2 } from '../_config/query';
import { IFieldVisitEmployee } from '../_config/types';
import EmployeeInformation from './employee-information';
import { IPaginationQuery } from '@/types';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const FieldVisit = () => {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const params = {} as IPaginationQuery;
	searchParams.forEach((value, key) => ((params as any)[key] = value));

	const { data, isLoading, url, deleteData, refetch } = useHrManualEntry2<IManualEntryTableData[]>(
		params,
		'type=field_visit'
	);

	// const { data, isLoading, url, deleteData, refetch } = useHrManualEntry<IManualEntryTableData[]>('field_visit');

	const pageInfo = useMemo(() => new PageInfo('HR/Field Visit', url, 'admin__field_visit'), [url]);

	const [selectedFieldVisit, setSelectedFieldVisit] = useState<IManualEntryTableData>();

	const { data: employeeInfo } = useHrEmployeeFieldVisitInfoByUUID<IFieldVisitEmployee>(
		selectedFieldVisit?.employee_uuid as string
	);

	const handleCreate = () => navigate('/hr/field-visit/add');

	const handleUpdate = (row: Row<IManualEntryTableData>) => {
		navigate(`/hr/field-visit/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IManualEntryTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.employee_uuid,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IManualEntryTableData>[]) => {
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
	const columns = fieldVisitColumns({ selectedFieldVisit, setSelectedFieldVisit });

	return (
		<div className='flex gap-4'>
			<div className='flex-1'>
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
			<div className='flex-1'>
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
