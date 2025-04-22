import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherBranch, useOtherVendor } from '@/lib/common-queries/other';

import { IPurchase } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IPurchase>();

	const { data: vendorOptions } = useOtherVendor<IFormSelectOption[]>();
	const { data: branchOptions } = useOtherBranch<IFormSelectOption[]>();

	return (
		<CoreForm.Section title={`Information`}>
			<FormField
				control={form.control}
				name='vendor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Vendor'
						placeholder='Select Vendor'
						options={vendorOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='branch_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Branch'
						placeholder='Select Branch'
						menuPortalTarget={document.body}
						options={branchOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='date' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='payment_mode' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
