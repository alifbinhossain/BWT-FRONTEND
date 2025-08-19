import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import ReactSelect from '@/components/ui/react-select';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { infoColumns } from '../_config/columns';
import { IInfoTableData } from '../_config/columns/columns.type';
import { useWorkInfo } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const PopUpModal = lazy(() => import('./pop-up-modal'));

const Info = () => {
	const navigate = useNavigate();
	const [type, setType] = useState('pending');
	const { data, isLoading, url, deleteData, updateData, postData, refetch } = useWorkInfo<IInfoTableData[]>(
		`status=${type}`
	);
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [updatedData, setUpdatedData] = useState<IInfoTableData>();

	const pageInfo = useMemo(() => new PageInfo('Work/Info', url, 'work__info'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_contact_with_customer');
	const actionTrxOverride = pageAccess.includes('click_contact_with_customer_override');

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
	const handleStatus = (row: Row<IInfoTableData>) => {
		if (row.original.is_contact_with_customer === false) {
			setUpdatedData(row.original);
			setIsOpenAddModal(true);
		} else {
			updateData.mutateAsync({
				url: `/work/info/${row?.original?.uuid}`,
				updatedData: {
					is_contact_with_customer: false,
					order_info_status: 'pending',
					updated_at: getDateTime(),
				},
			});
		}
	};
	const handleWhatsApp = (row: Row<IInfoTableData>) => {
		const val = row?.original;
		const fullURL = window.location.href;
		const slice = fullURL.split('w');
		const baseURl = slice[0];
		const fullUrl = ``;
		// let message = `BWT Order: ${baseURl}order/${row?.original?.uuid}.\n For new user, url: ${baseURl}login email: ${val.user_email} pass: ${val.user_phone}.\n For any query: 01956666777`;
		let message = `Successfully placed your order: ${val?.info_id}. You can view the details here: ${baseURl}work/info/${row?.original?.uuid}.`;

		const formattedNumber = val.user_phone.replace(/[^\d]/g, '');
		const url = `https://web.whatsapp.com/send?phone=88${formattedNumber}&text=${message}&app_absent=0`;
		window.open(url);
	};

	//* Table Columns
	const columns = infoColumns(handleStatus, actionTrxAccess, actionTrxOverride, handleWhatsApp);

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
							url: '/work/info',
							deleteData,
						}}
					/>,
					<PopUpModal
						{...{
							url: '/work/info',
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

export default Info;
