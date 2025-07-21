import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { HolidayCalendar } from '@/components/ui/holidayCalander';
import { TooltipProvider } from '@/components/ui/tooltip';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { holidayColumns } from '../_config/columns';
import { IHolidayTableData } from '../_config/columns/columns.type';
import { useHrHolidays } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useHrHolidays<IHolidayTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Holidays', url, 'admin__holiday'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IHolidayTableData | null>(null);

	const handleUpdate = (row: Row<IHolidayTableData>) => {
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
	const handleDelete = (row: Row<IHolidayTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Table Columns
	const columns = holidayColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='flex gap-4'>
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
						updated_at: false,
						created_by_name: false,
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
				<div className='flex w-full items-center justify-center rounded-md border'>
					<TooltipProvider>
						<HolidayCalendar
							selected={new Date()}
							highlightedDates={data?.map((e) => ({ date: new Date(e.date), info: e.name })) ?? []}
						/>
					</TooltipProvider>
				</div>
			</div>
		</PageProvider>
	);
};

export default Designation;
