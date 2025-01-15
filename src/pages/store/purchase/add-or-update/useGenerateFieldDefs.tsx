import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherProduct, useOtherStock } from '@/lib/common-queries/other';

import { IPurchase } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IPurchase>;
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: stockOptions } = useOtherStock<IFormSelectOption[]>();

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
