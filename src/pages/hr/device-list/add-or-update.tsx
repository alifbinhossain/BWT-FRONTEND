import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IDeviceListTableData } from '../_config/columns/columns.type';
import { useHrDeviceListByUUID, useHrUsers } from '../_config/query';
import { DEVICE_LIST_NULL, DEVICE_LIST_SCHEMA, IDeviceList } from '../_config/schema';
import { IAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IAddOrUpdateProps<IDeviceListTableData>> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { invalidateQuery: invalidateUserQuery } = useHrUsers();
	const { data } = useHrDeviceListByUUID(updatedData?.uuid as string);

	const form = useRHF(DEVICE_LIST_SCHEMA, DEVICE_LIST_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(DEVICE_LIST_NULL);
		invalidateUserQuery();
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
	async function onSubmit(values: IDeviceList) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Device List' : 'Add Device List'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='phone_number' render={(props) => <CoreForm.Phone {...props} />} />
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField
				control={form.control}
				name='identifier'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='location' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField
				control={form.control}
				name='connection_status'
				render={(props) => <CoreForm.Checkbox {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
