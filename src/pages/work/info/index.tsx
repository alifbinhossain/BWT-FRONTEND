import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import ReactSelect from '@/components/ui/react-select';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { infoColumns } from '../_config/columns';
import { IInfoTableData } from '../_config/columns/columns.type';
import { useWorkInfo } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Info = () => {
	const navigate = useNavigate();
	const [type, setType] = useState('pending');
	const { data, isLoading, url, deleteData, refetch } = useWorkInfo<IInfoTableData[]>(`status=${type}`);

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
				otherToolBarComponents={
					<ReactSelect
						options={[
							{ value: 'pending', label: 'Pending' },
							{ value: 'complete', label: 'Complete' },
							{ value: '', label: 'All' },
						]}
						value={[
							{ value: 'pending', label: 'Pending' },
							{ value: 'complete', label: 'Complete' },
							{ value: '', label: 'All' },
						]?.find((option) => option.value === type)}
						menuPortalTarget={document.body}
						styles={{
							menuPortal: (base) => ({ ...base, zIndex: 999 }),
							control: (base) => ({ ...base, minWidth: 120 }),
						}}
						onChange={(e: any) => {
							setType(e?.value);
						}}
					/>
				}
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
