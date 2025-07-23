import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPurchase, useOtherWarehouse, useOtherWarehouseByQuery } from '@/lib/common-queries/other';

import { IPurchaseReturn } from '../../_config/schema';

const Header = ({ isUpdate }: { isUpdate: boolean }) => {
	const form = useFormContext<IPurchaseReturn>();
	const { data: purchaseOptions } = useOtherPurchase<IFormSelectOption[]>();
	const { data: warehouseOptions } = useOtherWarehouseByQuery<IFormSelectOption[]>(`purchase_uuid=${form.watch('purchase_uuid')}`);

	return (
		<CoreForm.Section title={`Information`}>
			<FormField
				control={form.control}
				name='purchase_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Purchase'
						placeholder='Select Purchase'
						isDisabled={isUpdate}
						options={purchaseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						isDisabled={form.watch('purchase_uuid')===''}
						label='Warehouse'
						placeholder='Select Warehouse'
						options={warehouseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
