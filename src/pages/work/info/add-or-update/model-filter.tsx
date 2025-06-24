import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherModelByQuery } from '@/lib/common-queries/other';

const ModelFilter: React.FC<{ brand_uuid: string; form: any; index: number }> = ({ brand_uuid, form, index }) => {
	const { data: modelOption } = useOtherModelByQuery<IFormSelectOption[]>(`is_brand=false&brand_uuid=${brand_uuid}`);

	return (
		<FormField
			control={form.control}
			name={`order_entry.${index}.model_uuid`}
			render={(props) => (
				<CoreForm.ReactSelectCreate
					label='Model'
					placeholder='Select Model'
					options={modelOption!}
					{...props}
				/>
			)}
		/>
	);
};

export default ModelFilter;
