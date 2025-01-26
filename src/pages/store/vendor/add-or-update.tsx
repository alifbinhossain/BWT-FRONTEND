import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherModel } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IVendorTableData } from '../_config/columns/columns.type';
import { useStoreVendorsByUUID } from '../_config/query';
import { VENDOR_NULL, VENDOR_SCHEMA } from '../_config/schema';
import { IVendorAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IVendorAddOrUpdateProps> = ({
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
	const { data } = useStoreVendorsByUUID<IVendorTableData>(updatedData?.uuid as string);
	const { data: modelOptions } = useOtherModel<IFormSelectOption[]>();

	const form = useRHF(VENDOR_SCHEMA, VENDOR_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(VENDOR_NULL);
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
	async function onSubmit(values: IVendorTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Vendor` : 'Add New Vendor'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='is_active'
				render={(props) => (
					<CoreForm.Checkbox label='Active' defaultChecked={form.getValues('is_active')} {...props} />
				)}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='model_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Model' placeholder='Select Model' options={modelOptions!} {...props} />
				)}
			/>
			<FormField control={form.control} name='company_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='phone' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='address' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
