import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherDepartment, useOtherDesignation, useOtherUserByQuery, useOtherZone } from '@/lib/common-queries/other';

import { IInfo } from '../../_config/schema';
import { businessTypeOptions, platformTypeOptions } from './utils';

interface ICustomUserType extends IFormSelectOption {
	location: string;
	zone_uuid: string;
}

const Header = ({ isUpdate }: { isUpdate: boolean }) => {
	const form = useFormContext<IInfo>();

	const { data: userOption } = useOtherUserByQuery<ICustomUserType[]>('?type=customer');
	const isProductReceived = form.watch('is_product_received');
	const isNewCustomer = form.watch('is_new_customer');
	const isUser = form.watch('business_type') === 'user';
	const isBusinessTypeCompany =
		(form.watch('business_type') === 'tv_company' || form.watch('business_type') === 'corporate') && isNewCustomer;

	const { data: departmentOption } = useOtherDepartment<IFormSelectOption[]>();
	const { data: designationOption } = useOtherDesignation<IFormSelectOption[]>();
	const { data: zoneOption } = useOtherZone<IFormSelectOption[]>();

	useEffect(() => {
		if (isNewCustomer) {
			form.resetField('user_uuid');
		} else {
			form.resetField('name');
			form.resetField('phone');
			form.resetField('business_type');
			form.resetField('designation_uuid');
			form.resetField('department_uuid');
		}
	}, [isNewCustomer, form, isBusinessTypeCompany]);
	useEffect(() => {
		if (isUpdate) return;
		const zone_uuid = userOption?.find((item) => item.value === form.watch('user_uuid'))?.zone_uuid;
		const location = userOption?.find((item) => item.value === form.watch('user_uuid'))?.location;
		form.setValue('zone_uuid', zone_uuid || '');
		form.setValue('location', location || '');
	}, [form.watch('user_uuid'), isUpdate, userOption]);

	return (
		<CoreForm.Section
			title={
				<div className='flex justify-end gap-2'>
					<h1>Information</h1>
					<FormField
						control={form.control}
						name='is_new_customer'
						render={(props) => (
							<CoreForm.Checkbox label='New Customer' className='float-end bg-white' {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='is_product_received'
						render={(props) => (
							<CoreForm.Checkbox label='Product Received' className='float-end bg-white' {...props} />
						)}
					/>
					{isProductReceived && (
						<FormField
							control={form.control}
							name='received_date'
							render={(props) => <CoreForm.DatePicker disableLabel={true} {...props} />}
						/>
					)}
				</div>
			}
			className='lg:grid-cols-2'
		>
			<div className='flex flex-col gap-4'>
				{!isNewCustomer ? (
					<FormField
						control={form.control}
						name='user_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								menuPortalTarget={document.body}
								label='Customer'
								options={userOption || []}
								placeholder='Select Customer'
								{...props}
							/>
						)}
					/>
				) : (
					<div className='flex flex-col gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={(props) => <CoreForm.Input label='Customer Name' {...props} />}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={(props) => <CoreForm.Phone label='Phone Number' {...props} />}
						/>
						<FormField
							control={form.control}
							name='business_type'
							render={(props) => (
								<CoreForm.ReactSelect
									menuPortalTarget={document.body}
									label='Business Type'
									options={businessTypeOptions || []}
									placeholder='Select Business Type'
									{...props}
								/>
							)}
						/>

						{isUser && (
							<FormField
								control={form.control}
								name='where_they_find_us'
								render={(props) => (
									<CoreForm.ReactSelect
										menuPortalTarget={document.body}
										label='Where They Find Us'
										options={platformTypeOptions || []}
										placeholder='Select Platform'
										{...props}
									/>
								)}
							/>
						)}
					</div>
				)}

				{isNewCustomer && (
					<>
						<FormField
							control={form.control}
							name='designation_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									menuPortalTarget={document.body}
									label='Designation'
									options={designationOption || []}
									placeholder='Select Designation'
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='department_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									menuPortalTarget={document.body}
									label='Department'
									options={departmentOption || []}
									placeholder='Select Department'
									{...props}
								/>
							)}
						/>
					</>
				)}
			</div>

			<div className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='location'
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
				<FormField
					control={form.control}
					name='zone_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							menuPortalTarget={document.body}
							label='Zone'
							options={zoneOption || []}
							placeholder='Select Zone'
							{...props}
						/>
					)}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</CoreForm.Section>
	);
};

export default Header;
