import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherShiftGroup, useOtherShifts } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrRoaster, useHrRoasterByUUID } from '../_config/query';
import { IRoaster, ROASTER_NULL, ROASTER_SCHEMA } from '../_config/schema';
import { IRoasterAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IRoasterAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateUserQuery } = useHrRoaster();
	const { data } = useHrRoasterByUUID<IRoaster>(updatedData?.uuid as string);
	const { data: shiftOptions } = useOtherShifts<IFormSelectOption[]>();
	const { data: shiftsGroupOptions } = useOtherShiftGroup<IFormSelectOption[]>();

	const form = useRHF(ROASTER_SCHEMA, ROASTER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ROASTER_NULL);
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
	async function onSubmit(values: IRoaster) {
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
			title={isUpdate ? 'Update Roaster' : 'Add Roaster'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='shift_uuid'
				render={(props) => <CoreForm.ReactSelect label='Shift' options={shiftOptions || []} {...props} />}
			/>
			<FormField
				control={form.control}
				name='shift_group_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Shift Group' options={shiftsGroupOptions || []} {...props} />
				)}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
