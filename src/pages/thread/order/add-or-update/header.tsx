import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherBuyer,
	useOtherFactoryByPartyUUID,
	useOtherMarketing,
	useOtherMerchandiserByPartyUUID,
	useOtherParty,
} from '@/lib/common-queries/other';

import { IThreadOrderInfoEntry } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IThreadOrderInfoEntry>();

	const { data: marketing } = useOtherMarketing<IFormSelectOption[]>();
	const { data: buyer } = useOtherBuyer<IFormSelectOption[]>();
	const { data: party } = useOtherParty<IFormSelectOption[]>();
	const { data: merchandiser } = useOtherMerchandiserByPartyUUID<IFormSelectOption[]>(form.watch('party_uuid'));
	const { data: factory } = useOtherFactoryByPartyUUID<IFormSelectOption[]>(form.watch('party_uuid'));

	const extraHeader = (
		<div className='flex items-center gap-2'>
			<FormField
				control={form.control}
				name='is_sample'
				render={(props) => <CoreForm.Checkbox isBoxed label={'Sample'} {...props} />}
			/>
			<FormField
				control={form.control}
				name='is_bill'
				render={(props) => <CoreForm.Checkbox isBoxed label={'Bill'} {...props} />}
			/>
			<FormField
				control={form.control}
				name='is_cash'
				render={(props) => <CoreForm.Checkbox isBoxed label={'Cash'} {...props} />}
			/>
		</div>
	);

	return (
		<CoreForm.Section title='Information' extraHeader={extraHeader}>
			<FormField
				control={form.control}
				name='marketing_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Marketing'
						options={marketing || []}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='buyer_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Buyer'
						options={buyer || []}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='party_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Party'
						options={party || []}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='merchandiser_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Merchandiser'
						options={merchandiser || []}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='factory_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						menuPortalTarget={document.body}
						label='Factory'
						options={factory || []}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='delivery_date'
				render={(props) => <CoreForm.DatePicker {...props} />}
			/>
			<div className='sm:col-span-2 lg:col-span-3'>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</CoreForm.Section>
	);
};

export default Header;
