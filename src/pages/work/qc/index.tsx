import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import Formdata from '@/utils/formdata';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { QCColumns } from '../_config/columns';
import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkQC } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));

const Order = () => {
	const { data, isLoading, url, updateData, refetch } = useWorkQC<IOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/QC', url, 'work__qc'), [url]);
	const pageAccess = useAccess('work__qc') as string[];
	const haveDeliveryAccess = pageAccess?.includes('click_transfer_delivery');
	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IOrderTableData | null>(null);

	const handleUpdate = (row: Row<IOrderTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Table Columns

	const handelDeliveryStatusChange = async (row: Row<IOrderTableData>) => {
		const formData = {
			is_ready_for_delivery: !row.original.is_ready_for_delivery,
			ready_for_delivery_date: row.original.is_ready_for_delivery ? null : getDateTime(),
		};
		await updateData.mutateAsync({
			url: `/work/order-without-form/${row.original.uuid}`,
			updatedData: formData,
			isOnCloseNeeded: false,
		});
	};
	const columns = QCColumns({ handelDeliveryStatusChange, haveDeliveryAccess });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleRefetch={refetch}
				defaultVisibleColumns={{ updated_at: false, created_at: false, created_by_name: false }}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url: '/work/order-without-form',
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							updateData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Order;
