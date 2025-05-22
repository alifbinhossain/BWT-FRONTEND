import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { IDeviceAllocate } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	watch?: UseFormWatch<IDeviceAllocate>;
	form: any;
}

const useGenerateFieldDefs = ({ watch, form }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Check',
			accessorKey: 'is_checked',
			type: 'checkBox',
		},
		{
			header: 'Employee',
			accessorKey: 'employee_name',
			type: 'text',
		},
		{
			header: 'Temp Acc',
			accessorKey: 'is_temporary_access',
			type: 'checkBox',
		},
		{
			header: 'From',
			accessorKey: 'temporary_from_date',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`entry.${index}.temporary_from_date`}
						render={(props) => <CoreForm.DatePicker disableLabel {...props} />}
					/>
				);
			},
		},
		{
			header: 'To',
			accessorKey: 'temporary_to_date',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`entry.${index}.temporary_to_date`}
						render={(props) => <CoreForm.DatePicker disableLabel {...props} />}
					/>
				);
			},
		},
		// {
		// 	header: 'Actions',
		// 	accessorKey: 'actions',
		// 	type: 'custom',
		// 	component: (index: number) => {
		// 		return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
		// 	},
		// },
	];
};

export default useGenerateFieldDefs;
