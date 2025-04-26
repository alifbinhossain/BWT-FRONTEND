import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherAccessories,
	useOtherBox,
	useOtherFloor,
	useOtherModel,
	useOtherProblem,
	useOtherRack,
	useOtherSize,
	useOtherWarehouse,
} from '@/lib/common-queries/other';

import { IInfo } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IInfo>;
	isProductReceived?: boolean;
}

const useGenerateFieldDefs = ({ copy, remove, isProductReceived }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: modelOption } = useOtherModel<IFormSelectOption[]>();
	const { data: sizeOption } = useOtherSize<IFormSelectOption[]>();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('customer');
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { data: boxOption } = useOtherBox<IFormSelectOption[]>();
	const { data: accessoriesOption } = useOtherAccessories<IFormSelectOption[]>();

	return [
		{
			header: 'Diagnosis',
			accessorKey: 'is_diagnosis_need',
			type: 'checkBox',
		},
		{
			header: 'Model',
			accessorKey: 'model_uuid',
			type: 'select',
			options: modelOption || [],
			placeholder: 'Select Model',
		},
		{
			header: 'Size',
			accessorKey: 'size_uuid',
			type: 'select',
			options: sizeOption || [],
			placeholder: 'Select Size',
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
		},
		{
			header: 'Serial No',
			accessorKey: 'serial_no',
			type: 'textarea',
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
