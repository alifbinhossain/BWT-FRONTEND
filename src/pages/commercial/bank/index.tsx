import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { bankColumns } from '../_config/columns';
import { IBankTableData } from '../_config/columns/columns.type';
import { useCommercialBank } from '../_config/query';

//* Modals
const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const CommercialBank = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useCommercialBank<IBankTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Commercial/Bank', url, 'commercial__bank'), [url]);

	//* Add Modal
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	//* Update Modal
	const [updatedData, setUpdatedData] = useState<IBankTableData | null>(null);

	const handleUpdate = (row: Row<IBankTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	//* Delete Modal
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IBankTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	//* Columns
	const columns = bankColumns();

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

export default CommercialBank;
