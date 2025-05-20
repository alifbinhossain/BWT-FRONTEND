import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { configurationColumns } from '../_config/columns';
import { IConfigurationTableData } from '../_config/columns/columns.type';
import { useHrConfiguration } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Info = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useHrConfiguration<IConfigurationTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Work/Leave Configuration', url, 'admin__leave_configuration'), [url]);

	const handleCreate = () => navigate('/hr/leave-configuration/entry');
	const handleUpdate = (row: Row<IConfigurationTableData>) => {
		navigate(`/hr/leave-configuration/${row.original.uuid}/update`);
	};

	//* Delete Modal state
	//* Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//* Single Delete Handler
	const handleDelete = (row: Row<IConfigurationTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	//* Table Columns
	const columns = configurationColumns();

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
