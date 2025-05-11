import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherCourier, useOtherUserByQuery, useOtherVehicle } from '@/lib/common-queries/other';

import { IChallan } from '../../_config/schema';

const Header = ({ challan_uuid }: { challan_uuid: string }) => {
	const form = useFormContext<IChallan>();
	const query = challan_uuid
		? `?challan_uuid=${challan_uuid}`
		: `?type=customer&is_ready_for_delivery=true&is_delivery_complete=false`;
	const { data: customerOption } = useOtherUserByQuery<IFormSelectOption[]>(query);
	const { data: vehicleOption } = useOtherVehicle<IFormSelectOption[]>();
	const { data: employeeOption } = useOtherUserByQuery<IFormSelectOption[]>('?type=employee&designation=delivery');
	const { data: courierOption } = useOtherCourier<IFormSelectOption[]>();
	const paymentMethodOptions = [
		{ value: 'cash', label: 'Cash' },
		{ value: 'due', label: 'Due' },
	];
	const typeOption = [
		{ label: 'Customer Pickup', value: 'customer_pickup' },
		{ label: 'Employee Delivery', value: 'employee_delivery' },
		{ label: 'Vehicle Delivery', value: 'vehicle_delivery' },
		{ label: 'Courier Delivery', value: 'courier_delivery' },
	];

	return (
		<CoreForm.Section
			title={`Information`}
			extraHeader={
				<div className='text-white'>
					<FormField
						control={form.control}
						name='is_delivery_complete'
						render={(props) => (
							<CoreForm.Checkbox
								label='Delivery Complete'
								className='bg-white'
								placeholder='Select Customer'
								{...props}
							/>
						)}
					/>
				</div>
			}
		>
			<FormField
				control={form.control}
				name='customer_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Customer'
						placeholder='Select Customer'
						options={customerOption!}
						isDisabled={challan_uuid ? true : false}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='payment_method'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Payment Method'
						placeholder='Select payment method'
						options={paymentMethodOptions!}
						{...props}
					/>
				)}
			/>{' '}
			<FormField
				control={form.control}
				name='challan_type'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Type'
						placeholder='Select type'
						options={typeOption!}
						{...props}
					/>
				)}
			/>
			{(form.watch('challan_type') === 'employee_delivery' ||
				form.watch('challan_type') === 'vehicle_delivery') && (
				<FormField
					control={form.control}
					name='employee_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							menuPortalTarget={document.body}
							label='Employee'
							placeholder='Select Employee'
							options={employeeOption!}
							{...props}
						/>
					)}
				/>
			)}
			{form.watch('challan_type') === 'vehicle_delivery' && (
				<FormField
					control={form.control}
					name='vehicle_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							menuPortalTarget={document.body}
							label='Vehicle'
							placeholder='Select Vehicle'
							options={vehicleOption!}
							{...props}
						/>
					)}
				/>
			)}
			{form.watch('challan_type') === 'courier_delivery' && (
				<FormField
					control={form.control}
					name='courier_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							menuPortalTarget={document.body}
							label='Courier'
							placeholder='Select Courier'
							options={courierOption!}
							{...props}
						/>
					)}
				/>
			)}
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
