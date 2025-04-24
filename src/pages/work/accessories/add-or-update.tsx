import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherAccessories } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IAccessoriesTableData } from '../_config/columns/columns.type';
import { useWorkAccessoriesByUUID } from '../_config/query';
import { ACCESSORIES_NULL, ACCESSORIES_SCHEMA } from '../_config/schema';
import { IAccessoriesAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IAccessoriesAddOrUpdateProps> = ({
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
	const { data } = useWorkAccessoriesByUUID<IAccessoriesTableData>(updatedData?.uuid as string);
	const { invalidateQuery: invalidateGroup } = useOtherAccessories<IFormSelectOption[]>();

	const form = useRHF(ACCESSORIES_SCHEMA, ACCESSORIES_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ACCESSORIES_NULL);
		setOpen((prev) => !prev);
		invalidateGroup();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IAccessoriesTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Group` : 'Add New Accessories'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
