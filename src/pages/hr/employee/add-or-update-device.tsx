import { useEffect, useState } from 'react';
import { TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal, DeleteModal } from '@core/modal';

import { useOtherDeviceList } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { IDevicePermissionTableData } from '../_config/columns/columns.type';
import { useDevicePermission, useHrEmployeesByUUID } from '../_config/query';
import { employeeDeviceColumn } from './_config/columns';
import { EMPLOYEE_DEVICE_NULL, EMPLOYEE_DEVICE_SCHEMA, IEmployeeDevice } from './_config/schema';
import { IEmployeeDeviceAddOrUpdateProps } from './_config/types';

const AddOrUpdateDevice: React.FC<IEmployeeDeviceAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	employeeData,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useHrEmployeesByUUID(updatedData?.uuid as string);
	const {
		data: devices,
		isLoading,
		invalidateQuery,
		deleteData,
	} = useDevicePermission<IDevicePermissionTableData[]>(`employee_uuid=${employeeData?.uuid}`);
	const { data: deviceList } = useOtherDeviceList<IFormSelectOption[]>();

	const form = useRHF(EMPLOYEE_DEVICE_SCHEMA, EMPLOYEE_DEVICE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(EMPLOYEE_DEVICE_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IEmployeeDevice) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM

			const entries = values.device_list_uuid.map((item) => ({
				device_list_uuid: item,
				employee_uuid: employeeData?.uuid,
				is_temporary_access: values.is_temporary_access,
				temporary_from_date: values.temporary_from_date,
				temporary_to_date: values.temporary_to_date,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			}));
			await postData
				.mutateAsync({
					url,
					newData: entries,
					// onClose,
				})
				.then(() => {
					form.reset(EMPLOYEE_DEVICE_NULL);
					invalidateQuery();
				});
		}
	}

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IDevicePermissionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.device_list_name,
		});
	};

	const columns = employeeDeviceColumn();
	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Device' : 'Add Device'}
			form={form}
			onSubmit={onSubmit}
			containerClassName='space-y-6'
		>
			<Accordion type='single' collapsible>
				<AccordionItem value='advance-options' className='w-full border-b-0'>
					<AccordionTrigger className='!h-fit w-40 rounded-md bg-accent px-3 py-2 text-sm text-white'>
						Show Assigned Devices
					</AccordionTrigger>
					<AccordionContent className='pt-4'>
						<TableProvider
							title={'Assigned Devices'}
							columns={columns}
							data={devices ?? []}
							isLoading={isLoading}
							handleDelete={handleDelete}
							toolbarOptions={['export-csv', 'export-pdf', 'all-filter', 'date-range', 'refresh']}
							defaultVisibleColumns={{ updated_at: false, remarks: false }}
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
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='device_list_uuid'
					render={(props) => <CoreForm.MultiSelect label='Device' options={deviceList || []} {...props} />}
				/>
				<FormField
					control={form.control}
					name='is_temporary_access'
					render={(props) => <CoreForm.Checkbox label='Temporary Access' {...props} />}
				/>

				{form.watch('is_temporary_access') && (
					<>
						<FormField
							control={form.control}
							name='temporary_from_date'
							render={(props) => <CoreForm.DatePicker label='From' {...props} />}
						/>
						<FormField
							control={form.control}
							name='temporary_to_date'
							render={(props) => <CoreForm.DatePicker label='To' {...props} />}
						/>
					</>
				)}
			</div>
		</AddModal>
	);
};

export default AddOrUpdateDevice;
