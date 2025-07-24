import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPurchaseEntry } from '@/lib/common-queries/other';

import { IPurchaseReturn } from '../../_config/schema';

const PurchaseEntry: React.FC<{ form: any; index: number; data: IPurchaseReturn }> = ({ form, index, data }) => {
	const query = data?.purchase_return_entry[index]?.purchase_entry_uuid
		? undefined
		: `is_purchase_return_entry=false&purchase_uuid=${form('purchase_uuid')}&warehouse_uuid=${form('warehouse_uuid')}&is_product_transfer=false`;
	const { data: purchaseEntryOptions } = useOtherPurchaseEntry<IFormSelectOption[]>(query);

	return (
		<FormField
			control={form.control}
			name={`purchase_return_entry.${index}.purchase_entry_uuid`}
			render={(props) => (
				<CoreForm.ReactSelect
					label='Purchase Entry'
					placeholder='Select Purchase Entry'
					disableLabel={true}
					options={purchaseEntryOptions!}
					menuPortalTarget={document.body}
					isDisabled={
						data?.purchase_return_entry[index]?.purchase_entry_uuid || form(`warehouse_uuid`) === ''
							? true
							: false
					}
					{...props}
				/>
			)}
		/>
	);
};

export default PurchaseEntry;
