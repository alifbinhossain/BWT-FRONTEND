import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPurchaseEntry } from '@/lib/common-queries/other';

const PurchaseEntry: React.FC<{ form: any; index: number }> = ({ form, index }) => {
	const { data: purchaseEntryOptions } = useOtherPurchaseEntry<IFormSelectOption[]>(
		`is_purchase_return_entry = false`
	);

	return (
		<FormField
			control={form.control}
			name={`serials.${index}.purchase_entry_uuid`}
			render={(props) => (
				<CoreForm.ReactSelect
					disableLabel={true}
					label='Purchase Entry'
					placeholder='Select Warehouse'
					options={purchaseEntryOptions!}
					menuPortalTarget={document.body}
					{...props}
				/>
			)}
		/>
	);
};

export default PurchaseEntry;
