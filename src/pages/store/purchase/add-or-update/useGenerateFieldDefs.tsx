import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherBox,
	useOtherFloor,
	useOtherProduct,
	useOtherRack,
	useOtherWarehouse,
	useOtherWarehouseByQuery,
} from '@/lib/common-queries/other';

import { IPurchase } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IPurchase>;
	form: any;
}

const useGenerateFieldDefs = ({ copy, remove, watch, form }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: productOptions } = useOtherProduct<IFormSelectOption[]>();
	const { data: warehouseOptions } = useOtherWarehouseByQuery<IFormSelectOption[]>(
		`branch_uuid=${watch && watch('branch_uuid')}`
	);
	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();
	return [
		{
			header: 'Product',
			accessorKey: 'product_uuid',
			type: 'select',
			placeholder: 'Select Product',
			options: productOptions || [],
		},
		{
			header: 'Serial No',
			accessorKey: 'serial_no',
			type: 'text',
		},
		// {
		// 	header: 'Quantity',
		// 	accessorKey: 'quantity',
		// 	type: 'number',
		// },
		{
			header: 'Price',
			accessorKey: 'price_per_unit',
			type: 'number',
		},
		// {
		// 	header: 'Total',
		// 	accessorKey: 'total',
		// 	type: 'custom',
		// 	component: (index: number) => {
		// 		return <span>{watch?.(`purchase_entry.${index}.price_per_unit`) ?? 0}</span>;
		// 	},
		// },
		{
			header: 'Discount',
			accessorKey: 'discount',
			type: 'number',
		},
		{
			header: 'Location',
			accessorKey: 'location',
			type: 'custom',
			component: (index: number) => {
				return (
					<div className='flex flex-col gap-2'>
						<FormField
							control={form.control}
							name={`purchase_entry.${index}.warehouse_uuid`}
							render={(props) => (
								<CoreForm.ReactSelect
									label='warehouse_uuid'
									disableLabel={true}
									placeholder='Select Warehouse'
									menuPortalTarget={document.body}
									options={warehouseOptions!}
									{...props}
								/>
							)}
						/>
						{form.watch(`purchase_entry.${index}.warehouse_uuid`) && (
							<FormField
								control={form.control}
								name={`purchase_entry.${index}.rack_uuid`}
								render={(props) => (
									<CoreForm.ReactSelect
										label='rack_uuid'
										disableLabel={true}
										placeholder='Select Rack'
										menuPortalTarget={document.body}
										options={RackOptions!}
										{...props}
									/>
								)}
							/>
						)}
						{form.watch(`purchase_entry.${index}.rack_uuid`) && (
							<FormField
								control={form.control}
								name={`purchase_entry.${index}.floor_uuid`}
								render={(props) => (
									<CoreForm.ReactSelect
										label='floor_uuid'
										disableLabel={true}
										placeholder='Select Floor'
										menuPortalTarget={document.body}
										options={FloorOptions!}
										{...props}
									/>
								)}
							/>
						)}
						{form.watch(`purchase_entry.${index}.floor_uuid`) && (
							<FormField
								control={form.control}
								name={`purchase_entry.${index}.box_uuid`}
								render={(props) => (
									<CoreForm.ReactSelect
										label='box_uuid'
										disableLabel={true}
										placeholder='Select Box'
										menuPortalTarget={document.body}
										options={BoxOptions!}
										{...props}
									/>
								)}
							/>
						)}
					</div>
				);
			},
		},
		// {
		// 	header: 'Rack',
		// 	accessorKey: 'rack_uuid',
		// 	type: 'select',
		// 	placeholder: 'Select Rack',
		// 	options: RackOptions || [],
		// },
		// {
		// 	header: 'Floor',
		// 	accessorKey: 'floor_uuid',
		// 	type: 'select',
		// 	placeholder: 'Select Floor',
		// 	options: FloorOptions || [],
		// },
		// {
		// 	header: 'Box',
		// 	accessorKey: 'box_uuid',
		// 	type: 'select',
		// 	placeholder: 'Select Box',
		// 	options: BoxOptions || [],
		// },
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
