import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherPurchaseEntry } from '@/lib/common-queries/other';

import { IPurchaseReturn } from '../../_config/schema';
import PurchaseEntry from './purchse-entry';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IPurchaseReturn>;
	data?: IPurchaseReturn;
}

const useGenerateFieldDefs = ({ copy, remove, watch, data }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: productOptions } = useOtherPurchaseEntry<IFormSelectOption[]>();

	return [
		{
			header: 'Purchase Entry',
			accessorKey: 'purchase_entry_uuid',
			type: 'custom',
			component: (index: number) => {
				return <PurchaseEntry form={watch} index={index} data={data ?? { purchase_uuid: '', warehouse_uuid: '', remarks: null, purchase_return_entry: [] }} />;
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
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
