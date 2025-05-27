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
	return [
		
		{
			header: 'Employee',
			accessorKey: 'employee_name',
			type: 'readOnly',
			disabled: tab === 'permanent',
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
