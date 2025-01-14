import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherThreadCountLength } from '@/lib/common-queries/other';

import { IThreadOrderInfoEntry } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IThreadOrderInfoEntry>; // TODO: Update Schema Type
}

const useGenerateFieldDefs = ({ copy, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: countLength, isLoading } = useOtherThreadCountLength<IFormSelectOption[]>();

	const bleaching: IFormSelectOption[] = [
		{ label: 'Bleach', value: 'bleach' },
		{ label: 'Non-Bleach', value: 'non-bleach' },
	];

	return [
		{
			header: 'Color',
			accessorKey: 'color',
			type: 'text',
		},
		{
			header: 'Style',
			accessorKey: 'style',
			type: 'text',
		},
		{
			header: 'Count Length',
			accessorKey: 'count_length_uuid',
			type: 'select',
			options: countLength || [],
			isLoading,
		},
		{
			header: 'Bleaching',
			accessorKey: 'bleaching',
			type: 'select',
			options: bleaching,
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Company (USD/DZN)',
			accessorKey: 'company_price',
			type: 'number',
		},
		{
			header: 'Party (USD/DZN)',
			accessorKey: 'party_price',
			type: 'number',
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'text',
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
