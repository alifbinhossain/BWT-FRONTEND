import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherBox, useOtherFloor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IBoxTableData } from '../_config/columns/columns.type';
import { useStoreBoxesByUUID } from '../_config/query';
import { BOX_NULL, BOX_SCHEMA } from '../_config/schema';
import { IBoxAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IBoxAddOrUpdateProps> = ({
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
	const { data } = useStoreBoxesByUUID<IBoxTableData>(updatedData?.uuid as string);
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { invalidateQuery: invalidateBox } = useOtherBox<IFormSelectOption[]>();

	const form = useRHF(BOX_SCHEMA, BOX_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(BOX_NULL);
		setOpen((prev) => !prev);
		invalidateBox();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IBoxTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Box` : 'Add New Box'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='floor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Floor' placeholder='Select Floor' options={floorOption!} {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
