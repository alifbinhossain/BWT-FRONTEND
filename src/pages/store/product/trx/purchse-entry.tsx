import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPurchaseEntry } from '@/lib/common-queries/other';

const PurchaseEntry: React.FC<{ form: any; index: number; warehouse_uuid: string }> = ({
	form,
	index,
	warehouse_uuid,
}) => {
	const { data: purchaseEntryOptions } = useOtherPurchaseEntry<IFormSelectOption[]>(
		`is_purchase_return_entry=false&warehouse_uuid=${warehouse_uuid}`
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
