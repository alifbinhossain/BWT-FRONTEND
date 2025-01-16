import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherProduct } from '@/lib/common-queries/other';

import { IPurchaseReturn } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IPurchaseReturn>;
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: productOptions } = useOtherProduct<IFormSelectOption[]>();

	return [
		{
			header: 'Product',
			accessorKey: 'product_uuid',
			type: 'select',
			placeholder: 'Select Product',
			options: productOptions || [],
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
