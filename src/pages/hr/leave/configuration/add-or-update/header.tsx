import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherLeavePolicy } from '@/lib/common-queries/other';

import { ILeaveConfiguration } from '../../_config/schema';

const Header = ({ isUpdate }: { isUpdate: boolean }) => {
	const form = useFormContext<ILeaveConfiguration>();
	const { data: LeaveOption } = useOtherLeavePolicy<IFormSelectOption[]>();

	return (
		<CoreForm.Section title={isUpdate ? 'Edit Configuration' : ' Add New Configuration'} className='lg:grid-cols-2'>
			<FormField
				control={form.control}
				name='leave_policy_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Leave Policy'
						placeholder='Select Leave Policy'
						menuPortalTarget={document.body}
						options={LeaveOption!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
