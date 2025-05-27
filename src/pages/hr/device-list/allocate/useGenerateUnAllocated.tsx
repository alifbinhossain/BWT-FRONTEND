import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { IDeviceAllocate } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: any) => void;
	watch?: UseFormWatch<IDeviceAllocate>;
	form: any;
	tab: string;
}

const useGenerateFieldDefs = ({ remove, watch, form, tab }: IGenerateFieldDefsProps): FieldDef[] => {
	const types = [
		{
			label: 'Permanent',
			value: 'permanent',
		},
		{
			label: 'Temporary',
			value: 'temporary',
		},
	];

	return [
		{
			header: 'Check',
			accessorKey: 'is_checked',
			type: 'checkBox',
			disabled: tab === 'allocated',
		},
		{
			header: 'Employee',
			accessorKey: 'employee_name',
			type: 'readOnly',
			disabled: tab === 'allocated',
		},
		{
			header: 'Permission Type',
			accessorKey: 'permission_type',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`entry.${index}.permission_type`}
						render={(props) => (
							<CoreForm.Select
								disableLabel
								options={types}
								onChange={(value) => {
									if (value === 'permanent') {
										form.setValue(`entry.${index}.temporary_from_date`, null);
										form.setValue(`entry.${index}.temporary_to_date`, null);
									}
								}}
								{...props}
							/>
						)}
					/>
				);
			},
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
						render={(props) => (
							<CoreForm.DatePicker
								disableLabel
								disabled={watch?.(`entry.${index}.permission_type`) === 'permanent'}
								{...props}
							/>
						)}
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
						render={(props) => (
							<CoreForm.DatePicker
								disableLabel
								disabled={watch?.(`entry.${index}.permission_type`) === 'permanent'}
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			hidden: tab === 'un-allocated',
			component: (index: number) => {
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
