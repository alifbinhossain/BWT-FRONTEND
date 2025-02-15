import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { processColumns } from '../../../_config/columns';
import { IOrderTableData, IProcessTableData } from '../../../_config/columns/columns.type';
import { useWorkProcesses } from '../../../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const EntryTable: React.FC<{ data: IOrderTableData }> = ({ data }) => {
	const navigate = useNavigate();
	const { isLoading, url, deleteData, postData, updateData, refetch } = useWorkProcesses<IProcessTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Process', url, 'work__order_details'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		navigate(`/work/transfer-section/${data?.diagnosis?.uuid}/${data?.uuid}`);
	};

	const [updatedData, setUpdatedData] = useState<IProcessTableData | null>(null);

	const handleUpdate = (row: Row<IProcessTableData>) => {
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
	const handleDelete = (row: Row<IProcessTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.process_id,
		});
	};

	// Table Columns
	const columns = processColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data?.process ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
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

export default EntryTable;
