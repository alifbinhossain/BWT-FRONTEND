import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { infoColumns } from '../_config/columns';
import { IInfoTableData } from '../_config/columns/columns.type';
import { useWorkInfo } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Info = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useWorkInfo<IInfoTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Info', url, 'work__info'), [url]);

	const handleCreate = () => navigate('/work/info/entry');
	const handleUpdate = (row: Row<IInfoTableData>) => {
		navigate(`/work/info/${row.original.uuid}/update`);
	};

	//* Delete Modal state
	//* Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//* Single Delete Handler
	const handleDelete = (row: Row<IInfoTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.info_id,
		});
	};

	//* Table Columns
	const columns = infoColumns();

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

export default Info;
