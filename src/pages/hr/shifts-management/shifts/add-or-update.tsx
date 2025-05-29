import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrShifts, useHrShiftsByUUID } from '../_config/query';
import { IShift, SHIFT_NULL, SHIFT_SCHEMA } from '../_config/schema';
import { IShiftsAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IShiftsAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateUserQuery } = useHrShifts();
	const { data } = useHrShiftsByUUID<IShift>(updatedData?.uuid as string);
	const [color, setColor] = useState({});

	const form = useRHF(SHIFT_SCHEMA, SHIFT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SHIFT_NULL);
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
	async function onSubmit(values: IShift) {
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
			title={isUpdate ? 'Update Shift' : 'Add Shift'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='flex justify-end gap-4'>
				<FormField
					control={form.control}
					name='status'
					render={(props) => <CoreForm.Switch label='Status' {...props} />}
				/>
				<FormField
					control={form.control}
					name='default_shift'
					render={(props) => <CoreForm.Switch label='Default Shift' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={(props) => <CoreForm.Input label='Name' {...props} />}
				/>
				<FormField
					control={form.control}
					name='initial'
					render={(props) => <CoreForm.Input label='Initial' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='start_time'
					render={(props) => <CoreForm.TimePicker label='Start Time' {...props} />}
				/>
				<FormField
					control={form.control}
					name='end_time'
					render={(props) => <CoreForm.TimePicker label='End Time' {...props} />}
				/>
				<FormField
					control={form.control}
					name='late_time'
					render={(props) => <CoreForm.TimePicker label='Late After' {...props} />}
				/>
				<FormField
					control={form.control}
					name='early_exit_before'
					render={(props) => <CoreForm.TimePicker label='Early Exit Before' {...props} />}
				/>
				<FormField
					control={form.control}
					name='first_half_end'
					render={(props) => <CoreForm.TimePicker label='First Half End' {...props} />}
				/>
				<FormField
					control={form.control}
					name='break_time_end'
					render={(props) => <CoreForm.TimePicker label='Break Time End' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='first_half_absent'
					render={(props) => <CoreForm.Switch label='First Half Absent' {...props} />}
				/>
				<FormField
					control={form.control}
					name='color'
					render={(props) => <CoreForm.Input label='color' {...props} />}
				/>
			</div>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea label='Remarks' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
