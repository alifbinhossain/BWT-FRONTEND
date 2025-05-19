import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { fieldVisitColumns } from '../_config/columns';
import { IFieldVisitTableData } from '../_config/columns/columns.type';
import { useHrFieldVisit } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const FieldVisit = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useHrFieldVisit<IFieldVisitTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('HR/Field Visit', url, 'admin__field_visit'), [url]);

	const handleCreate = () => navigate('/hr/field-visit/add');

	const handleUpdate = (row: Row<IFieldVisitTableData>) => {
		navigate(`/hr/field-visit/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IFieldVisitTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.employee_uuid,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IFieldVisitTableData>[]) => {
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
	const columns = fieldVisitColumns();

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
				handleDeleteAll={handleDeleteAll}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: '/hr/manual-entry',
							deleteData,
						}}
					/>,
					<DeleteAllModal
						{...{
							deleteItems,
							setDeleteItems,
							url: '/hr/manual-entry',
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default FieldVisit;
