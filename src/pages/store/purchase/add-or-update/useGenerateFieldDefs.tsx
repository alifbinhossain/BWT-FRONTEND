import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherBox,
	useOtherFloor,
	useOtherRack,
	useOtherRoom,
	useOtherStock,
	useOtherWarehouse,
} from '@/lib/common-queries/other';

import { IPurchase } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IPurchase>;
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: stockOptions } = useOtherStock<IFormSelectOption[]>();
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: RoomOptions } = useOtherRoom<IFormSelectOption[]>();
	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();

	return [
		{
			header: 'Stock',
			accessorKey: 'stock_uuid',
			type: 'select',
			placeholder: 'Select Stock',
			options: stockOptions || [],
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
			header: 'Room',
			accessorKey: 'room_uuid',
			type: 'select',
			placeholder: 'Select Room',
			options: RoomOptions || [],
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
