import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherBox,
	useOtherFloor,
	useOtherModel,
	useOtherProblem,
	useOtherRack,
	useOtherSize,
	useOtherWarehouse,
} from '@/lib/common-queries/other';

import { IOrder } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IOrder>;
}

const useGenerateFieldDefs = ({ copy, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: modelOption } = useOtherModel<IFormSelectOption[]>();
	const { data: sizeOption } = useOtherSize<IFormSelectOption[]>();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('customer');
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
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
			placeholder: 'Select Size',
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
		},
		{
			header: 'Rack',
			accessorKey: 'rack_uuid',
			type: 'select',
			options: rackOption || [],
			placeholder: 'Select Rack',
		},
		{
			header: 'Floor',
			accessorKey: 'floor_uuid',
			type: 'select',
			options: floorOption || [],
			placeholder: 'Select Floor',
		},
		{
			header: 'Box',
			accessorKey: 'box_uuid',
			type: 'select',
			options: boxOption || [],
			placeholder: 'Select Box',
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
