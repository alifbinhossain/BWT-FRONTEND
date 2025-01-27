import { watch } from 'fs';
import { useEffect } from 'react';
import Designation from '@/pages/hr/designation';
import { create } from 'lodash';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import {
	useOtherBox,
	useOtherFloor,
	useOtherModel,
	useOtherProblem,
	useOtherRack,
	useOtherSize,
	useOtherUser,
	useOtherWarehouse,
} from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkJobsByUUID } from '../_config/query';
import { ORDER_NULL, ORDER_SCHEMA } from '../_config/schema';
import { IOrderAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IOrderAddOrUpdateProps> = ({
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
	const { data } = useWorkJobsByUUID<IOrderTableData>(updatedData?.uuid as string);
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();
	const { data: modelOption } = useOtherModel<IFormSelectOption[]>();
	const { data: sizeOption } = useOtherSize<IFormSelectOption[]>();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	const { data: warehouseOption } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { data: boxOption } = useOtherBox<IFormSelectOption[]>();
	const accessoriesOption = [
		{ label: 'Power Cable', value: 'power_cable' },
		{ label: 'HDMI Cable', value: 'hdmi_cable' },
		{ label: 'Remote', value: 'remote' },
		{ label: 'USB Cable', value: 'usb_cable' },
		{ label: 'Ethernet Cable', value: 'ethernet_cable' },
		{ label: 'Charger', value: 'charger' },
		{ label: 'Others', value: 'others' },
	];

	const form = useRHF(ORDER_SCHEMA, ORDER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ORDER_NULL);
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
	async function onSubmit(values: IOrderTableData) {
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
			// ADD NEW USER IF NOT EXIST
			const new_uuid: string = nanoid();
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					user_uuid: values?.is_new_customer ? new_uuid : values?.user_uuid,
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
			title={isUpdate ? `Update ${updatedData?.order_id} Order` : 'Add New Order'}
			isSmall={true}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='flex justify-end gap-2'>
				<FormField
					control={form.control}
					name='is_new_customer'
					render={(props) => <CoreForm.Checkbox label='New Customer' className='h-5' {...props} />}
				/>
				<FormField
					control={form.control}
					name='is_product_received'
					render={(props) => <CoreForm.Checkbox label='Receive' className='h-5' {...props} />}
				/>
			</div>
			<div className='flex space-x-4'>
				<div className='flex-1'>
					{!form.watch('is_new_customer') && (
						<FormField
							control={form.control}
							name='user_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Customer'
									placeholder='Select Customer'
									options={userOption!}
									{...props}
								/>
							)}
						/>
					)}
					{form.watch('is_new_customer') && (
						<FormField
							control={form.control}
							name='name'
							render={(props) => <CoreForm.Input label='Customer Name' {...props} />}
						/>
					)}
					{form.watch('is_new_customer') && (
						<FormField
							control={form.control}
							name='phone'
							render={(props) => <CoreForm.Input label='Customer Phone No' {...props} />}
						/>
					)}
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='receive_date'
						render={(props) => <CoreForm.DatePicker {...props} />}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='model_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Model'
								placeholder='Select Model'
								options={modelOption!}
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='size_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Size'
								placeholder='Select Size'
								options={sizeOption!}
								{...props}
							/>
						)}
					/>
				</div>
			</div>
			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='serial_no'
						render={(props) => <CoreForm.Input {...props} />}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problems_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								isMulti={true}
								label='Problem'
								placeholder='Select Problems'
								options={problemOption!}
								{...props}
							/>
						)}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problem_statement'
						render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='accessories'
						render={(props) => (
							<CoreForm.ReactSelect
								isMulti={true}
								label='Accessories'
								placeholder='Select accessories'
								options={accessoriesOption!}
								{...props}
							/>
						)}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='warehouse_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Warehouse'
								placeholder='Select Warehouse'
								options={warehouseOption!}
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='rack_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Rack'
								placeholder='Select Racks'
								options={rackOption!}
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='floor_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Floor'
								placeholder='Select Floors'
								options={floorOption!}
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='box_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Box'
								placeholder='Select Boxes'
								options={boxOption!}
								{...props}
							/>
						)}
					/>
				</div>
			</div>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
