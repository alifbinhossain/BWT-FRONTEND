import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherEmployees } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ISalaryIncrementTableData } from '../_config/columns/columns.type';
import { usePayrollSalaryIncrement, usePayrollSalaryIncrementByUUID } from '../_config/query';
import { ISalaryIncrement, SALARY_INCREMENT_NULL, SALARY_INCREMENT_SCHEMA } from '../_config/schema';
import { IAddOrUpdateProps } from '../_config/types';
import { type } from '../utils';

const AddOrUpdate: React.FC<IAddOrUpdateProps<ISalaryIncrementTableData>> = ({
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
	const { invalidateQuery: invalidateUserQuery } = usePayrollSalaryIncrement();
	const { data } = usePayrollSalaryIncrementByUUID<ISalaryIncrement>(updatedData?.uuid as string);
	const { data: employees } = useOtherEmployees<IFormSelectOption[]>();

	const form = useRHF(SALARY_INCREMENT_SCHEMA, SALARY_INCREMENT_NULL);

	const disabled = false;

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SALARY_INCREMENT_NULL);
		invalidateUserQuery();
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ISalaryIncrement) {
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
			title={isUpdate ? 'Update Salary Increment' : 'Add Salary Increment'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='employee_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Employee' options={employees || []} isDisabled={disabled} {...props} />
				)}
			/>

			<FormField
				control={form.control}
				name='amount'
				render={(props) => <CoreForm.JoinInputUnit unit='Tk.' type='number' label='amount' {...props} />}
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
