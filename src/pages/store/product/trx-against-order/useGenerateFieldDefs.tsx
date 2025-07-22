import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherPurchaseEntry } from '@/lib/common-queries/other';

import { ITransfer } from '../../_config/schema';
import PurchaseEntry from './purchse-entry';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<ITransfer>;
	warehouse_uuid?: string;
}

const useGenerateFieldDefs = ({ copy, remove, watch, warehouse_uuid }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Purchase Entry',
			accessorKey: 'purchase_entry_uuid',
			type: 'custom',
			component: (index: number) => {
				return <PurchaseEntry form={watch} index={index} warehouse_uuid={warehouse_uuid ?? ''} />;
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
