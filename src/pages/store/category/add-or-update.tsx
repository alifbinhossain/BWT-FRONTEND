import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';

import { useOtherGroup } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ICategoryTableData } from '../_config/columns/columns.type';
import { useStoreCategoriesByUUID } from '../_config/query';
import { CATEGORY_NULL, CATEGORY_SCHEMA } from '../_config/schema';
import { ICategoryAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<ICategoryAddOrUpdateProps> = ({
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
	const { data } = useStoreCategoriesByUUID<ICategoryTableData>(updatedData?.uuid as string);
	const { data: groupOptions } = useOtherGroup<IFormSelectOption[]>();

	const form = useRHF(CATEGORY_SCHEMA, CATEGORY_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CATEGORY_NULL);
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
	async function onSubmit(values: ICategoryTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Category` : 'Add New Category'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />

			<FormField
				control={form.control}
				name='group_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Group' placeholder='Select Group' options={groupOptions!} {...props} />
				)}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
