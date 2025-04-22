import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { QCColumns } from '../_config/columns';
import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkQC } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));

const Order = () => {
	const { data, isLoading, url, postData, updateData, refetch } = useWorkQC<IOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/QC', url, 'work__qc'), [url]);

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
		await updateData.mutateAsync({
			url: `/work/order/${row.original.uuid}`,
			updatedData: {
				is_ready_for_delivery: !row.original.is_ready_for_delivery,
			},
			isOnCloseNeeded: false,
		});
	};
	const columns = QCColumns({ handelDeliveryStatusChange });

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
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Order;
