import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';

import { useOtherDepartment, useOtherDesignation } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrUsersByUUID } from '../_config/query';
import { EMPLOYEE_NULL, EMPLOYEE_SCHEMA, IEmployee } from '../_config/schema';
import { IEmployeeAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IEmployeeAddOrUpdateProps> = ({
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
	const { data } = useHrUsersByUUID(updatedData?.uuid as string);
	const { data: departmentData } = useOtherDepartment<IFormSelectOption[]>();
	const { data: designationData } = useOtherDesignation<IFormSelectOption[]>();

	const form = useRHF(EMPLOYEE_SCHEMA(isUpdate) as any, EMPLOYEE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(EMPLOYEE_NULL);
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
	async function onSubmit(values: IEmployee) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					user_type: 'employee',
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			await postData.mutateAsync({
				url,
				newData: {
					...values,
					user_type: 'employee',
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
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Employ' : 'Add Employ'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-3 gap-4'>
				{
					<FormField
						control={form.control}
						name='department_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Department'
								placeholder='Select Department'
								options={departmentData!}
								{...props}
							/>
						)}
					/>
				}
				{
					<FormField
						control={form.control}
						name='designation_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Designation'
								placeholder='Select Designation'
								options={designationData!}
								{...props}
							/>
						)}
					/>
				}
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='ext' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Phone {...props} />} />
			</div>
			{!isUpdate && (
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='pass'
						render={(props) => <CoreForm.Input label='Password' type={'password'} {...props} />}
					/>
					<FormField
						control={form.control}
						name='repeatPass'
						render={(props) => <CoreForm.Input label='Repeat Password' type={'password'} {...props} />}
					/>
				</div>
			)}

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
