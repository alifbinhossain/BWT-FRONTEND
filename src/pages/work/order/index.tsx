import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import Formdata from '@/utils/formdata';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { orderColumns } from '../_config/columns';
import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis, useWorkInHandWork, useWorkRepairing } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Order = () => {
	const navigate = useNavigate();

	const pageAccess = useAccess('work__order') as string[];

	const { invalidateQuery: invalidateDiagnosis } = useWorkDiagnosis();
	const { invalidateQuery: invalidateRepairing } = useWorkRepairing();

	const actionTrxAccess = pageAccess.includes('click_trx');
	const actionProceedToRepair = pageAccess.includes('click_proceed_to_repair');
	const actionDiagnosisNeed = pageAccess.includes('click_diagnosis_need');
	const { data, isLoading, url, deleteData, imagePostData, imageUpdateData, updateData, refetch } =
		useWorkInHandWork<IOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Order', url, 'work__order'), [url]);

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
	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IOrderTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	const handleProceedToRepair = async (row: Row<IOrderTableData>) => {
		const is_proceed_to_repair = !row?.original?.is_proceed_to_repair;
		const updated_at = getDateTime();
		const formData = Formdata({ is_proceed_to_repair, updated_at });
		await imageUpdateData.mutateAsync({
			url: `/work/order/${row?.original?.uuid}`,
			updatedData: formData,
		});
		invalidateDiagnosis();
		invalidateRepairing();
	};
	const handelDiagnosisStatusChange = async (row: Row<IOrderTableData>) => {
		const is_diagnosis_need = !row?.original?.is_diagnosis_need;
		const updated_at = getDateTime();
		const formData = Formdata({ is_diagnosis_need, updated_at });
		await imageUpdateData.mutateAsync({
			url: `/work/order/${row?.original?.uuid}`,
			updatedData: formData,
		});
		invalidateDiagnosis();
		invalidateRepairing();
	};

	// Table Columns
	const handleAgainstTrx = (row: Row<IOrderTableData>) => {
		navigate(`/work/transfer-section/${row.original.info_uuid}/${null}/${row.original.uuid}`);
	};
	const columns = orderColumns({
		actionTrxAccess,
		actionProceedToRepair,
		handleAgainstTrx,
		handleProceedToRepair,
		actionDiagnosisNeed,
		handelDiagnosisStatusChange,
	});

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
				defaultVisibleColumns={{ updated_at: false, created_by_name: false }}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url: '/work/order',
							
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							imageUpdateData,
							setUpdatedData,
							imagePostData,
							updatedData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: '/work/order',
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Order;
