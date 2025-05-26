import { Suspense, useEffect, useMemo, useState } from 'react';
import { PageProvider } from '@/context';
import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { DeleteModal } from '@/components/core/modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime, PageInfo } from '@/utils';

import { IDevicePermissionTableData } from '../../_config/columns/columns.type';
import { useDevicePermission, useHrDeviceAllocation } from '../../_config/query';
import { DEVICE_ALLOCATE_NULL, DEVICE_ALLOCATE_SCHEMA, IDeviceAllocate } from '../../_config/schema';
import useGeneratePermanent from './useGeneratePermanent';
import useGenerateTemporary from './useGenerateTemporary';
import useGenerateUnAllocated from './useGenerateUnAllocated';

const DeviceList = () => {
	const { user } = useAuth();
	const { uuid } = useParams();

	const [tab, setTab] = useState('un-allocated');

	const isUpdate = tab === 'temporary';

	const pageInfo = useMemo(() => new PageInfo('HR/Device List', '/hr/device-allocate', 'admin__device_allocate'), []);

	const { data, postData, updateData, deleteData, invalidateQuery } =
		useHrDeviceAllocation<{ employee_uuid: string; employee_name: string }[]>(uuid);

	const { data: allocatedDevices, invalidateQuery: allocatedDevicesInvalidateQuery } = useDevicePermission<
		IDevicePermissionTableData[]
	>(
		tab === 'permanent'
			? `device_list_uuid=${uuid}&permission_type=permanent`
			: tab === 'temporary'
				? `device_list_uuid=${uuid}&permission_type=temporary`
				: `device_list_uuid=${uuid}`
	);

	const form = useRHF(DEVICE_ALLOCATE_SCHEMA, DEVICE_ALLOCATE_NULL);

	const { fields, remove } = useFieldArray({
		control: form.control,
		name: 'entry',
	});

	useEffect(() => {
		if (data && allocatedDevices) {
			if (tab === 'un-allocated') {
				const customData = data.map((item) => ({
					is_checked: false,
					employee_uuid: item.employee_uuid,
					employee_name: item.employee_name,
					permission_type: 'permanent',
					temporary_from_date: null,
					temporary_to_date: null,
				}));

				form.setValue('entry', customData);
			} else {
				const customData = allocatedDevices.map((item) => ({
					is_checked: false,
					uuid: item.uuid,
					employee_uuid: item.employee_uuid,
					employee_name: item.employee_name,
					permission_type: item.permission_type,
					temporary_from_date: item.temporary_from_date,
					temporary_to_date: item.temporary_to_date,
				}));

				form.setValue('entry', customData);
			}
		}
	}, [data, allocatedDevices, form, tab]);

	const onSubmit = async (values: IDeviceAllocate) => {
		const entries = values.entry.filter((item) => item.is_checked);

		if (entries.length === 0) {
			toast.warning('Please select at least one employee');
			return;
		}

		if (isUpdate) {
			const updatedEntries = entries.map((item) => ({
				...item,
				updated_at: getDateTime(),
			}));
			
			const updatePromises = updatedEntries.map(async (item) => {
				await updateData.mutateAsync({
					url: `/hr/device-permission/${item.uuid}`,
					updatedData: item,
				});
			});

			await Promise.all(updatePromises).then(() => {
				invalidateQuery();
				allocatedDevicesInvalidateQuery();
			});

			return;
		}

		const newEntries = entries.map((item) => ({
			...item,
			device_list_uuid: uuid,
			created_at: getDateTime(),
			created_by: user?.uuid,
			uuid: nanoid(),
		}));

		await postData
			.mutateAsync({
				url: '/hr/device-permission',
				newData: newEntries,
			})
			.then(() => {
				invalidateQuery();
				allocatedDevicesInvalidateQuery();
			});

		return;
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const name: string = String(form.getValues('entry')[index].employee_name);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: name,
			});
		} else {
			remove(index);
		}
	};

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<Tabs defaultValue='un-allocated'>
				<TabsList className='bg-primary text-white'>
					<TabsTrigger value='un-allocated' onClick={() => setTab('un-allocated')}>
						Un-Allocated users
					</TabsTrigger>
					<TabsTrigger value='permanent-users' onClick={() => setTab('permanent')}>
						Permanent users
					</TabsTrigger>
					<TabsTrigger value='temporary-users' onClick={() => setTab('temporary')}>
						Temporary users
					</TabsTrigger>
				</TabsList>
				<TabsContent value='un-allocated'>
					<CoreForm.AddEditWrapper title={' Add Purchase Entry'} form={form} onSubmit={onSubmit}>
						<CoreForm.DynamicFields
							title='Un-Allocated Users'
							form={form}
							fieldName='entry'
							fieldDefs={useGenerateUnAllocated({
								remove: handleRemove,
								watch: form.watch,
								form,
								tab,
							})}
							fields={fields}
						/>
					</CoreForm.AddEditWrapper>
				</TabsContent>
				<TabsContent value='permanent-users'>
					<CoreForm.AddEditWrapper title={' Add Purchase Entry'} form={form} onSubmit={onSubmit}>
						<CoreForm.DynamicFields
							title='Permanent Users'
							form={form}
							fieldName='entry'
							fieldDefs={useGeneratePermanent({
								remove: handleRemove,
								watch: form.watch,
								form,
								tab,
							})}
							fields={fields}
						/>
					</CoreForm.AddEditWrapper>
				</TabsContent>
				<TabsContent value='temporary-users'>
					<CoreForm.AddEditWrapper title={' Add Purchase Entry'} form={form} onSubmit={onSubmit}>
						<CoreForm.DynamicFields
							title='Allocated Users'
							form={form}
							fieldName='entry'
							fieldDefs={useGenerateTemporary({
								remove: handleRemove,
								watch: form.watch,
								form,
								tab,
							})}
							fields={fields}
						/>
					</CoreForm.AddEditWrapper>
				</TabsContent>
			</Tabs>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/hr/device-permission`,
						deleteData,
						onClose: () => {
							form.setValue(
								'entry',
								form.getValues('entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
						invalidateQueries: allocatedDevicesInvalidateQuery,
					}}
				/>
			</Suspense>
		</PageProvider>
	);
};

export default DeviceList;
