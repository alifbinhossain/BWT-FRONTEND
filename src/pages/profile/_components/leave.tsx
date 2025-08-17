import React, { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProviderSSR } from '@/context';
import { applyLeaveColumns } from '@/pages/hr/leave/_config/columns';
import { IApplyLeaveTableData } from '@/pages/hr/leave/_config/columns/columns.type';
import { applyLeaveFilters } from '@/pages/hr/leave/_config/columns/facetedFilters';
import { useHrApplyLeave2, useHrEmployeeLeaveDetails } from '@/pages/hr/leave/_config/query';
import { ILeaveEmployee } from '@/pages/hr/leave/_config/types';
import LeaveApplicationInformation from '@/pages/hr/leave/apply-leave/leave_application_information';
import { IPaginationQuery } from '@/types';
import { Separator } from '@radix-ui/react-select';
import { Row } from '@tanstack/react-table';
import { extend } from 'lodash';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMonthYearNavigation } from '@/hooks/useMonthYearNavigation';

import { MonthNavigation } from '@/components/others/month-navigation';
import { YearNavigation } from '@/components/others/year-navigation';

import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';
import { Column } from '@/lib/component/type';
import { MONTH_NAMES } from '@/lib/utils';
import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));
interface ILeavePaginationQuery extends IPaginationQuery {
	employee_uuid: string | undefined;
	year: number;
}

const FieldVisit = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { year, handlePrev, handleNext } = useMonthYearNavigation(true);
	const { uuid } = useParams();

	const params = { year: year, employee_uuid: uuid } as ILeavePaginationQuery;
	searchParams.forEach((value, key) => ((params as any)[key] = value));

	const { data, pagination, isLoading, url, deleteData, refetch } = useHrApplyLeave2<{
		data: IApplyLeaveTableData[];
	}>(params);

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
	const leaveInformationColumns: Column[] = [
		{
			accessoriesKey: 'name',
			header: 'Name',
			type: 'text',
		},
		{
			accessoriesKey: 'used_leave_days',
			header: 'Used Leave Days',
			type: 'text',
		},
		{
			accessoriesKey: 'remaining_leave_days',
			header: 'Remaining Leave Days',
			type: 'text',
		},
		{
			accessoriesKey: 'maximum_number_of_allowed_leaves',
			header: 'Balance',
			type: 'text',
		},
	];

	return (
		<div className='flex gap-2'>
			<div>
				<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
					<TableProviderSSR
						start_date={params.start_date ? new Date(params.start_date) : new Date()}
						end_date={params.end_date ? new Date(params.end_date) : new Date()}
						title={
							<div className='flex items-center justify-between gap-2'>
								<h1 className='flex-1 text-2xl font-semibold'>Leave Details of {year}</h1>
							</div>
						}
						subtitle={
							<div className='flex items-center gap-2'>
								<YearNavigation year={year} onPrevYear={handlePrev} onNextYear={handleNext} />
							</div>
						}
						pagination={pagination!}
						columns={columns}
						data={data?.data ?? []}
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
									url: '/hr/apply-leave',
									deleteData,
								}}
							/>,
						])}
					</TableProviderSSR>
				</PageProvider>
			</div>
			<div className='w-full rounded-md border bg-white p-4'>
				{employeeInfo ? (
					<div>
						{employeeInfo.remaining_leave_information && (
							<TableWithoutTitleBackground
								title='Remaining Leaves Information'
								data={employeeInfo.remaining_leave_information}
								columns={leaveInformationColumns}
							/>
						)}
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
