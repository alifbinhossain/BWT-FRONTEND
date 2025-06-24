import { useState } from 'react';
import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherAccessories,
	useOtherBox,
	useOtherBrand,
	useOtherFloor,
	useOtherModelByQuery,
	useOtherProblem,
	useOtherRack,
	useOtherWarehouse,
} from '@/lib/common-queries/other';

import { IInfo } from '../../_config/schema';
import ModelFilter from './model-filter';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IInfo>;
	isProductReceived?: boolean;
	form: any;
}

const useGenerateFieldDefs = ({ copy, remove, isProductReceived, form }: IGenerateFieldDefsProps): FieldDef[] => {
	const [brand, setBrand] = useState([]);

	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('customer');
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { data: boxOption } = useOtherBox<IFormSelectOption[]>();
	const { data: accessoriesOption } = useOtherAccessories<IFormSelectOption[]>();
	const { data: brandOptions } = useOtherBrand<IFormSelectOption[]>();

	return [
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
		{
			header: 'Proceed to Repair',
			accessorKey: 'is_proceed_to_repair',
			type: 'custom',
			component: (index: number) => {
				return (
					<div className='flex gap-2'>
						<FormField
							control={form.control}
							name={`order_entry.${index}.is_diagnosis_need`}
							render={(props) => <CoreForm.Checkbox label='Diagnosis Needed' {...props} />}
						/>
						<FormField
							control={form.control}
							name={`order_entry.${index}.is_proceed_to_repair`}
							render={(props) => <CoreForm.Checkbox label='Proceed to Repair' {...props} />}
						/>
					</div>
				);
			},
		},
		{
			header: 'Brand',
			accessorKey: 'brand_uuid',
			type: 'custom',
			component: (index: number) => {
				setBrand(form.watch(`order_entry.${index}.brand_uuid`));
				return (
					<FormField
						control={form.control}
						name={`order_entry.${index}.brand_uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								menuPortalTarget={document.body}
								label='Brand'
								options={brandOptions || []}
								placeholder='Select Brand'
								{...props}
							/>
						)}
					/>
				);
			},
		},
		// {
		// 	header: 'Model',
		// 	accessorKey: 'model_uuid',
		// 	type: 'select',
		// 	options: modelOption || [],
		// 	placeholder: 'Select Model',
		// },
		{
			header: 'Model',
			accessorKey: 'model_uuid',
			type: 'custom',
			component: (index: number) => {
				return (
					<ModelFilter brand_uuid={form.watch(`order_entry.${index}.brand_uuid`)} form={form} index={index} />
				);
			},
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Accessories',
			accessorKey: 'accessories',
			type: 'multiSelect',
			options: accessoriesOption || [],
			placeholder: 'Select Accessories',
			hidden: !isProductReceived,
		},
		{
			header: 'Serial No',
			accessorKey: 'serial_no',
			type: 'textarea',
			hidden: !isProductReceived,
		},
		{
			header: 'Problems',
			accessorKey: 'problems_uuid',
			type: 'multiSelect',
			options: problemOption || [],
			placeholder: 'Select Problems',
		},
		{
			header: 'Problem Statement',
			accessorKey: 'problem_statement',
			type: 'textarea',
		},
		{
			header: 'Warehouse',
			accessorKey: 'warehouse_uuid',
			type: 'select',
			options: warehouseOptions || [],
			placeholder: 'Select Warehouse',
			hidden: !isProductReceived,
		},
		{
			header: 'Rack',
			accessorKey: 'rack_uuid',
			type: 'select',
			options: rackOption || [],
			placeholder: 'Select Rack',
			hidden: !isProductReceived,
		},
		{
			header: 'Floor',
			accessorKey: 'floor_uuid',
			type: 'select',
			options: floorOption || [],
			placeholder: 'Select Floor',
			hidden: !isProductReceived,
		},
		{
			header: 'Box',
			accessorKey: 'box_uuid',
			type: 'select',
			options: boxOption || [],
			placeholder: 'Select Box',
			hidden: !isProductReceived,
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
	];
};

export default useGenerateFieldDefs;
