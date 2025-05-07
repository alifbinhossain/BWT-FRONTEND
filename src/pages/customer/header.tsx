import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IInfo } from './_config/schema';
import { platformTypeOptions } from './utils';

const Header = () => {
	const form = useFormContext<IInfo>();

	return (
		<CoreForm.Section
			title={
				<div className='flex justify-end gap-2'>
					<h1>Information</h1>
				</div>
			}
			className='lg:grid-cols-2'
		>
			<div className='flex flex-col gap-4'>
				{
					<div className='flex flex-col gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={(props) => <CoreForm.Input label='Customer Name' {...props} />}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={(props) => <CoreForm.Input label='Phone Number' {...props} />}
						/>

						{
							<FormField
								control={form.control}
								name='where_they_find_us'
								render={(props) => (
									<CoreForm.ReactSelect
										menuPortalTarget={document.body}
										label='Where They Find Us'
										options={platformTypeOptions || []}
										placeholder='Select Platform'
										{...props}
									/>
								)}
							/>
						}
					</div>
				}
			</div>

			<div className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='location'
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</CoreForm.Section>
	);
};

export default Header;
