import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherPurchaseEntry, useOtherWarehouse } from '@/lib/common-queries/other';

import { IRepair } from '../_config/schema';
import { ICustomPurchaseEntrySelectOption, ICustomWarehouseSelectOption } from '../order/details/transfer/utills';

interface IGenerateFieldDefsProps {
	remove: (index: any) => void;
	watch?: UseFormWatch<IRepair>;
	form: any;
	data: any;
	isUpdate: boolean;
}
// Define this outside your field definitions

const useGenerateFieldDefs = ({ remove, watch, form, data, isUpdate }: IGenerateFieldDefsProps): FieldDef[] => {
	const query = isUpdate
		? `is_warehouse=true&is_purchase_return_entry=false`
		: `is_warehouse=true&is_purchase_return_entry=false&is_product_transfer=false`;
	const { data: purchaseEntryOptions } = useOtherPurchaseEntry<ICustomPurchaseEntrySelectOption[]>(
		`${query}`
	);
	const { data: warehouseOptions } = useOtherWarehouse<ICustomWarehouseSelectOption[]>();

	return [
		{
			header: 'Purchase Entry',
			accessorKey: 'purchase_entry_uuid',
			type: 'custom',
			component: (index: number) => {
				const warehouseUuid =
					purchaseEntryOptions?.find(
						(item) => item.value === form.watch(`product_transfer.${index}.purchase_entry_uuid`)
					)?.warehouse_uuid ?? '';

				form.setValue(`product_transfer.${index}.warehouse_uuid`, warehouseUuid);
				return (
					<FormField
						name={`product_transfer.${index}.purchase_entry_uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								label='Purchase Entry'
								disableLabel={true}
								options={purchaseEntryOptions!}
								menuPortalTarget={document.body}
								placeholder='Select Purchase Entry'
								{...props}
							/>
						)}
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
