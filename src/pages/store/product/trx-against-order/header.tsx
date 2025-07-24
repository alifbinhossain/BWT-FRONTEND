import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherOrder } from '@/lib/common-queries/other';

import { ITransfer } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<ITransfer>();
	const { data: orderOptions } = useOtherOrder<IFormSelectOption[]>(`is_repair=true`);

	return (
		<CoreForm.Section title={`Information`}>
			<FormField
				control={form.control}
				name='order_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Order'
						placeholder='Select Order'
						menuPortalTarget={document.body}
						options={orderOptions!}
						{...props}
					/>
				)}
			/>
		</CoreForm.Section>
	);
};

export default Header;
