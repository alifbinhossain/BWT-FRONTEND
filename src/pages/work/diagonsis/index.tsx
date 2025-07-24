import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import Formdata from '@/utils/formdata';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { diagnosisColumns } from '../_config/columns';
import { IDiagnosisTableData, IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Diagnosis = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, imageUpdateData, refetch } =
		useWorkDiagnosis<IDiagnosisTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Diagnosis', url, 'work__diagnosis'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_trx');

	//* Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IDiagnosisTableData | null>(null);

	const handleUpdate = (row: Row<IDiagnosisTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	//* Delete Modal state
	//* Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//* Single Delete Handler
	const handleDelete = (row: Row<IDiagnosisTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.order_id,
		});
	};

	//* handle Transfer
	const handleAgainstTrx = (row: Row<IDiagnosisTableData>) => {
		navigate(`/work/transfer-section/${row.original.info_uuid}/${row.original.uuid}/${row.original.order_uuid}`);
	};

	const handleProceedToRepair = async (row: Row<IOrderTableData>) => {
		const is_proceed_to_repair = !row?.original?.is_proceed_to_repair;
		const is_diagnosis_need = false;
		const updated_at = getDateTime();

		const formData = Formdata({ is_proceed_to_repair, updated_at });

		await imageUpdateData.mutateAsync({
			url: `/work/order/${row?.original?.uuid}`,
			updatedData: formData,
		});
	};

	//* Table Columns
	const columns = diagnosisColumns({ actionTrxAccess, handleAgainstTrx, handleProceedToRepair });

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
				defaultVisibleColumns={{ updated_at: false, created_at: false, created_by_name: false }}
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
		</PageProvider>
	);
};

export default Diagnosis;
