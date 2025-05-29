import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherShifts } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrShiftsGroup, useHrShiftsGroupByUUID } from '../_config/query';
import { IShiftGroup, SHIFT_GROUP_NULL, SHIFT_GROUP_SCHEMA } from '../_config/schema';
import { IShiftsGroupAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IShiftsGroupAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateUserQuery } = useHrShiftsGroup();
	const { data } = useHrShiftsGroupByUUID<IShiftGroup>(updatedData?.uuid as string);
	const { data: shiftOptions } = useOtherShifts<IFormSelectOption[]>();

	const form = useRHF(SHIFT_GROUP_SCHEMA, SHIFT_GROUP_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SHIFT_GROUP_NULL);
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
	async function onSubmit(values: IShiftGroup) {
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
			title={isUpdate ? 'Update Shift Group' : 'Add Shift Group'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='flex justify-end gap-4'>
				<FormField
					control={form.control}
					name='status'
					render={(props) => <CoreForm.Checkbox label='Status' {...props} />}
				/>
				<FormField
					control={form.control}
					name='default_shift'
					render={(props) => <CoreForm.Checkbox label='Default Shift' {...props} />}
				/>
			</div>
			<FormField
				control={form.control}
				name='name'
				render={(props) => <CoreForm.Input label='Name' {...props} />}
			/>
			<FormField
				control={form.control}
				name='shifts_uuid'
				render={(props) => <CoreForm.ReactSelect label='Shift' options={shiftOptions || []} {...props} />}
			/>{' '}
			<FormField
				control={form.control}
				name='off_days'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti
						label='Off Days'
						options={[
							{
								label: 'Friday',
								value: 'fri',
							},
							{
								label: 'Saturday',
								value: 'sat',
							},
							{
								label: 'Sunday',
								value: 'sun',
							},
							{
								label: 'Monday',
								value: 'mon',
							},
							{
								label: 'Tuesday',
								value: 'tue',
							},
							{
								label: 'Wednesday',
								value: 'wed',
							},
							{
								label: 'Thursday',
								value: 'thu',
							},
						]}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='effective_date'
				render={(props) => <CoreForm.DatePicker label='Effective Date' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
