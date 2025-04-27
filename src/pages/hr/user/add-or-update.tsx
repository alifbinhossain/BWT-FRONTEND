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
import { IUser, USER_NULL, USER_SCHEMA } from '../_config/schema';
import { IUserAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IUserAddOrUpdateProps> = ({
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

	const typeOptions = [
		{
			label: 'Customer',
			value: 'customer',
		},
		{
			label: 'Employ',
			value: 'employee',
		},
		{
			label: 'Vendor',
			value: 'vendor',
		},
	];
	const ratingOption = [
		{
			label: 1,
			value: 1,
		},
		{
			label: 2,
			value: 2,
		},
		{
			label: 3,
			value: 3,
		},
		{
			label: 4,
			value: 4,
		},
		{
			label: 5,
			value: 5,
		},
	];
	const businessType = [
		{
			label: 'User',
			value: 'user',
		},
		{
			label: 'TV Company',
			value: 'tv_company',
		},
		{
			label: 'Corporate',
			value: 'corporate',
		},
	];

	const form = useRHF(USER_SCHEMA(isUpdate) as any, USER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(USER_NULL);
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
	async function onSubmit(values: IUser) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
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
			title={isUpdate ? 'Update User' : 'Add User'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-3 gap-4'>
				<FormField
					control={form.control}
					name='user_type'
					render={(props) => (
						<CoreForm.ReactSelect
							label='User Type'
							placeholder='Select Type'
							options={typeOptions!}
							{...props}
						/>
					)}
				/>
				{form.watch('user_type') === 'customer' && (
					<FormField
						control={form.control}
						name='business_type'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Business Type'
								placeholder='Select Business Type'
								options={businessType!}
								{...props}
							/>
						)}
					/>
				)}
				{(form.watch('user_type') === 'employee' ||
					form.watch('business_type') === 'tv_company' ||
					form.watch('business_type') === 'corporate' ||
					form.watch('user_type') === 'vendor') && (
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
				)}
				{(form.watch('user_type') === 'employee' ||
					form.watch('business_type') === 'tv_company' ||
					form.watch('business_type') === 'corporate' ||
					form.watch('user_type') === 'vendor') && (
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
				)}
				<FormField
					control={form.control}
					name='rating'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Rating'
							placeholder='Select Rating'
							options={ratingOption!}
							{...props}
						/>
					)}
				/>{' '}
				<FormField
					control={form.control}
					name='price'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Price Rating'
							placeholder='Price Rating'
							options={ratingOption!}
							{...props}
						/>
					)}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='ext' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Input {...props} />} />
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
