import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherBrand, useOtherModel } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IModelTableData } from '../_config/columns/columns.type';
import { useStoreModelsByUUID } from '../_config/query';
import { MODEL_NULL, MODEL_SCHEMA } from '../_config/schema';
import { IModelAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IModelAddOrUpdateProps> = ({
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
	const { data } = useStoreModelsByUUID<IModelTableData>(updatedData?.uuid as string);
	const { data: brandOptions } = useOtherBrand<IFormSelectOption[]>();
	const { invalidateQuery: invalidateModel } = useOtherModel<IFormSelectOption[]>();

	const form = useRHF(MODEL_SCHEMA, MODEL_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MODEL_NULL);
		setOpen((prev) => !prev);
		invalidateModel();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IModelTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Model` : 'Add New Model'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='brand_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Brand' placeholder='Select Brand' options={brandOptions!} {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
