import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrEmployeeTypeByUUID, useHrEmployeeTypes } from '../_config/query';
import { EMPLOYEE_TYPE_NULL, EMPLOYEE_TYPE_SCHEMA, IEmployeeType } from '../_config/schema';
import { IEmployeeTypeAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IEmployeeTypeAddOrUpdateProps> = ({
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
	const { data } = useHrEmployeeTypeByUUID(updatedData?.uuid as string);
	const { invalidateQuery: invalidateUserQuery } = useHrEmployeeTypes();

	const form = useRHF(EMPLOYEE_TYPE_SCHEMA, EMPLOYEE_TYPE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(EMPLOYEE_TYPE_NULL);
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
	async function onSubmit(values: IEmployeeType) {
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
			title={isUpdate ? 'Update Employee Type' : 'Add Employee Type'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='status' render={(props) => <CoreForm.Checkbox {...props} />} />
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
