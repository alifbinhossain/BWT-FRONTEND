import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherLeaveCategory } from '@/lib/common-queries/other';

import { ILeaveConfiguration } from '../../_config/schema';
import { applicabilityOptions, leaveCarryTypeOptions } from './utils';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<ILeaveConfiguration>;
	isProductReceived?: boolean;
	form: any;
}
const useGenerateFieldDefs = ({ form, copy, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: leaveCategoryOptions } = useOtherLeaveCategory<IFormSelectOption[]>();
	return [
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
		{
			header: 'Leave Category',
			accessorKey: 'leave_category_uuid',
			type: 'select',
			options: leaveCategoryOptions || [],
			placeholder: 'Select Leave Category',
		},

		{
			header: 'Maximum Number of Allowed Leaves',
			accessorKey: 'maximum_number_of_allowed_leaves',
			type: 'number',
		},
		{
			header: 'Consecutive Days',
			accessorKey: 'consecutive_days',
			type: 'number',
		},
		{
			header: 'Count Off Days as Leaves',
			accessorKey: 'count_off_days_as_leaves',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`configuration_entry.${index}.count_off_days_as_leaves`}
						render={(props) => <CoreForm.Switch label='Count Off Days as Leaves' {...props} />}
					/>
				);
			},
		},
		{
			header: 'Maximum Number of Leave Per Month',
			accessorKey: 'maximum_number_of_leave_per_month',
			type: 'number',
		},
		{
			header: 'Applicability',
			accessorKey: 'applicability',
			type: 'select',
			options: applicabilityOptions || [],
			placeholder: 'Select Applicability',
		},
		{
			header: 'Eligible After Joining',
			accessorKey: 'eligible_after_joining',
			type: 'number',
		},
		{
			header: 'Enable Pro Rata',
			accessorKey: 'enable_pro_rata',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`configuration_entry.${index}.enable_pro_rata`}
						render={(props) => <CoreForm.Switch label='Enable Pro Rata' {...props} />}
					/>
				);
			},
		},
		{
			header: 'Max Available Time',
			accessorKey: 'max_avail_time',
			type: 'number',
		},
		{
			header: 'Enable Earned Leave',
			accessorKey: 'enable_earned_leave',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`configuration_entry.${index}.enable_earned_leave`}
						render={(props) => <CoreForm.Switch label='Enable Earned Leave' {...props} />}
					/>
				);
			},
		},
		{
			header: 'Number of Leaves to Provide File',
			accessorKey: 'number_of_leaves_to_provide_file',
			type: 'number',
		},
		{
			header: 'Leave Carry',
			accessorKey: 'leave_carry_type',
			type: 'select',
			options: leaveCarryTypeOptions || [],
			placeholder: 'Select Leave Carry Type',
		},
		{
			header: 'Maximum Number of Leaves to Carry',
			accessorKey: 'maximum_number_of_leaves_to_carry',
			type: 'join-input-unit',
			unit: (index: number) => 'Day(s)',
		},

		{
			header: 'Enable Previous Day Selection',
			accessorKey: 'enable_previous_day_selection',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`configuration_entry.${index}.enable_previous_day_selection`}
						render={(props) => (
							<CoreForm.Switch
								label='Enable Previous Day Selection'
								onCheckedChange={(value) =>
									!value &&
									form.setValue(`configuration_entry.${index}.previous_date_selected_limit`, 0)
								}
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Previous Date Selected Limit',
			accessorKey: 'previous_date_selected_limit',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`configuration_entry.${index}.previous_date_selected_limit`}
						render={(props) => (
							<CoreForm.JoinInputUnit
								unit='Day(s)'
								label='Enable Previous Day Selection'
								disabled={!form.watch(`configuration_entry.${index}.enable_previous_day_selection`)}
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
	];
};

export default useGenerateFieldDefs;
