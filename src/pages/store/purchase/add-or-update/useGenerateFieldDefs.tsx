import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
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
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
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
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Price Per Unit',
			accessorKey: 'price_per_unit',
			type: 'number',
		},
		{
			header: 'Discount',
			accessorKey: 'discount',
			type: 'number',
		},
		{
			header: 'Warehouse',
			accessorKey: 'warehouse_uuid',
			type: 'select',
			placeholder: 'Select Warehouse',
			options: warehouseOptions || [],
		},
		{
			header: 'Rack',
			accessorKey: 'rack_uuid',
			type: 'select',
			placeholder: 'Select Rack',
			options: RackOptions || [],
		},
		{
			header: 'Floor',
			accessorKey: 'floor_uuid',
			type: 'select',
			placeholder: 'Select Floor',
			options: FloorOptions || [],
		},
		{
			header: 'Box',
			accessorKey: 'box_uuid',
			type: 'select',
			placeholder: 'Select Box',
			options: BoxOptions || [],
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
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
