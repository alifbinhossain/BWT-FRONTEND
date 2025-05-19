import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherWorkplace } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrSpecialDays, useHrSpecialDaysByUUID } from '../_config/query';
import { ISpecialDays, SPECIAL_DAYS_NULL, SPECIAL_DAYS_SCHEMA } from '../_config/schema';
import { ISpecialDayAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<ISpecialDayAddOrUpdateProps> = ({
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
	const { data } = useHrSpecialDaysByUUID(updatedData?.uuid as string);
	const { data: workplaceOptions } = useOtherWorkplace<IFormSelectOption[]>();
	const { invalidateQuery: invalidateUserQuery } = useHrSpecialDays();

	const form = useRHF(SPECIAL_DAYS_SCHEMA, SPECIAL_DAYS_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SPECIAL_DAYS_NULL);
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
	async function onSubmit(values: ISpecialDays) {
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
			title={isUpdate ? 'Update Specials Days' : 'Add Specials Days'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='workplace_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Workplace'
						options={workplaceOptions!}
						placeholder='Select Workplace'
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='from_date' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='to_date' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
