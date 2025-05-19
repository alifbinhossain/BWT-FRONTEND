import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrWorkPlaceByUUID, useHrWorkPlaces } from '../_config/query';
import { IWorkplace, WORKPLACE_NULL, WORKPLACE_SCHEMA } from '../_config/schema';
import { IWorkplaceAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IWorkplaceAddOrUpdateProps> = ({
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
	const { data } = useHrWorkPlaceByUUID(updatedData?.uuid as string);
	const { invalidateQuery: invalidateUserQuery } = useHrWorkPlaces();

	const form = useRHF(WORKPLACE_SCHEMA, WORKPLACE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(WORKPLACE_NULL);
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
	async function onSubmit(values: IWorkplace) {
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
			title={isUpdate ? 'Update WorkPlace' : 'Add WorkPlace'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='status' render={(props) => <CoreForm.Checkbox {...props} />} />
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='hierarchy'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='latitude'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='longitude'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
