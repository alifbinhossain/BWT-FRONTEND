import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { FormSelectProps } from './types';

const FormSelect: React.FC<FormSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
	isDisabled = false,
	disableLabel,
	valueType = 'string',
	isLoading = false,
	onChange = () => {},
}) => {
	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name.split('_').join(' ')}{' '}
					{optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				{isLoading ? (
					<Skeleton className='bg-gradient h-10 w-full rounded-md border border-input' />
				) : (
					<Select
						onValueChange={(value) => {
							if (valueType === 'number') {
								field.onChange(Number(value));
								onChange(value);
							} else {
								field.onChange(value);
								onChange(value);
							}
						}}
						defaultValue={field.value}
						disabled={isDisabled}
						{...field}
						value={field?.value?.toString()}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.value} value={option?.value?.toString()}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormSelect;
