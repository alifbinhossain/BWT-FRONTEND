import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProviderSSR } from '@/context';
import { IPaginationQuery } from '@/types';
import { Row } from '@tanstack/react-table';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { fieldVisitColumns } from '../_config/columns';
import { IManualEntryTableData } from '../_config/columns/columns.type';
import { filedVisitFilters } from '../_config/columns/facetedFilters';
import { useHrEmployeeFieldVisitInfoByUUID, useHrManualEntry2 } from '../_config/query';
import { IFieldVisitEmployee } from '../_config/types';
import EmployeeInformation from './employee-information';
import FiledVisitInformation from './field_visit_information';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const FieldVisit = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const params = {} as IPaginationQuery;
	searchParams.forEach((value, key) => ((params as any)[key] = value));
	const { data, pagination, isLoading, url, deleteData, refetch } =
		useHrManualEntry2<IManualEntryTableData[]>(params);

	const pageInfo = useMemo(() => new PageInfo('HR/Field Visit', url, 'admin__field_visit'), [url]);

	const [selectedFieldVisit, setSelectedFieldVisit] = useState<IManualEntryTableData>();

	const { data: employeeInfo } = useHrEmployeeFieldVisitInfoByUUID<IFieldVisitEmployee>(
		selectedFieldVisit?.employee_uuid as string,
		selectedFieldVisit?.uuid as string
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

	// Table Columns
	const columns = fieldVisitColumns({ selectedFieldVisit, setSelectedFieldVisit });

	return (
		<div className='flex gap-4'>
			<div className='flex-1'>
				<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
					<TableProviderSSR
						title={pageInfo.getTitle()}
						columns={columns}
						data={data ?? []}
						pagination={pagination!}
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
						filterOptions={filedVisitFilters}
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
						])}
					</TableProviderSSR>
				</PageProvider>
			</div>
			<div className='flex-1'>
				{employeeInfo ? (
					<div>
						<EmployeeInformation data={employeeInfo} />
						<Separator className='my-4' />
						<FiledVisitInformation data={employeeInfo} />
					</div>
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
