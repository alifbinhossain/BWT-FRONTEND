import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

// import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import '@/lib/common-queries/other';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IDiagnosisTableData, IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis, useWorkOrderByUUID } from '../_config/query';
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
	const { data } = useWorkOrderByUUID<IOrderTableData>(updatedData?.uuid as string);

	// const { data: modelOption } = useOtherModel<IFormSelectOption[]>();
	// const { data: sizeOption } = useOtherSize<IFormSelectOption[]>();
	// const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('customer');
	// const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	// const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	// const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	// const { data: boxOption } = useOtherBox<IFormSelectOption[]>();
	const { invalidateQuery: invalidateDiagnosis } = useWorkDiagnosis<IDiagnosisTableData[]>();

	const form = useRHF(ORDER_SCHEMA, ORDER_NULL);

	// const accessoriesOption = [
	// 	{ label: 'Power Cable', value: 'power_cable' },
	// 	{ label: 'HDMI Cable', value: 'hdmi_cable' },
	// 	{ label: 'Remote', value: 'remote' },
	// 	{ label: 'USB Cable', value: 'usb_cable' },
	// 	{ label: 'Ethernet Cable', value: 'ethernet_cable' },
	// 	{ label: 'Charger', value: 'charger' },
	// 	{ label: 'Others', value: 'others' },
	// ];
	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ORDER_NULL);
		invalidateDiagnosis();
		setOpen(false);
	};

	// Submit handler
	async function onSubmit(values: IOrderTableData) {
		const payload = {
			...values,
		};

		if (isUpdate) {
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...payload,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			await postData.mutateAsync({
				url,
				newData: {
					...payload,
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
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			{/* <div className='flex justify-end gap-2'>
				<FormField
					control={form.control}
					name='is_diagnosis_need'
					render={(props) => <CoreForm.Checkbox label='Diagnosis Needed' {...props} />}
				/>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='model_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Model'
								options={modelOption || []}
								placeholder='Select Model'
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
								options={sizeOption || []}
								placeholder='Select Size'
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='serial_no'
						render={(props) => <CoreForm.Input label='Serial Number' {...props} />}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='quantity'
						render={(props) => <CoreForm.Input type='number' label='Quantity' {...props} />}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problems_uuid'
						render={(props) => (
							<CoreForm.MultiSelect
								label='Problems'
								options={problemOption || []}
								placeholder='Select Problems'
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='accessories'
						render={(props) => (
							<CoreForm.MultiSelect
								label='Accessories'
								options={accessoriesOption}
								placeholder='Select Accessories'
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
			</div>

			{
				<div className='grid grid-cols-4 gap-4'>
					<FormField
						control={form.control}
						name='warehouse_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Warehouse'
								options={warehouseOptions || []}
								placeholder='Select Warehouse'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='rack_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Rack'
								options={rackOption || []}
								placeholder='Select Rack'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='floor_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Floor'
								options={floorOption || []}
								placeholder='Select Floor'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='box_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Box'
								options={boxOption || []}
								placeholder='Select Box'
								{...props}
							/>
						)}
					/>
				</div>
			} */}

			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea label='Remarks' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
