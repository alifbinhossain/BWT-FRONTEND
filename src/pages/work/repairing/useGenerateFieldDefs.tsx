import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherProduct, useOtherWarehouse } from '@/lib/common-queries/other';

import { IRepair } from '../_config/schema';
import {
	getFilteredWarehouseOptions,
	ICustomProductsSelectOption,
	ICustomWarehouseSelectOption,
} from '../order/details/transfer/utills';
import { QuantityField } from './quntity-flied';

interface IGenerateFieldDefsProps {
	remove: (index: any) => void;
	watch?: UseFormWatch<IRepair>;
	form: any;
	data: any;
}
// Define this outside your field definitions

const useGenerateFieldDefs = ({ remove, watch, form, data }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: productOptions } = useOtherProduct<ICustomProductsSelectOption[]>(`?is_quantity=true`);
	const { data: warehouseOptions } = useOtherWarehouse<ICustomWarehouseSelectOption[]>();

	return [
		{
			header: 'Product',
			accessorKey: 'product_uuid',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						name={`product_transfer.${index}.product_uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								label='Product'
								disableLabel={true}
								options={productOptions!}
								menuPortalTarget={document.body}
								placeholder='Select Product'
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Warehouse',
			accessorKey: 'warehouse_uuid',
			type: 'custom',
			component: (index: number) => {
				const filteredWarehouseOptions = getFilteredWarehouseOptions(
					form.watch(`product_transfer.${index}.product_uuid`) || '',
					productOptions,
					warehouseOptions
				);
				return (
					<FormField
						name={`product_transfer.${index}.warehouse_uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								label='Warehouse'
								disableLabel={true}
								options={filteredWarehouseOptions}
								menuPortalTarget={document.body}
								placeholder='Select Warehouse'
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'custom',
			component: (index: number) => {
				return (
					<QuantityField
						data={data}
						index={index}
						form={form}
						productOptions={productOptions!}
						warehouseOptions={warehouseOptions!}
					/>
				);
			},
		},
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
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
