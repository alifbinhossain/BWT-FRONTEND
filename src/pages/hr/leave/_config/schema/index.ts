import { getYear } from 'date-fns';
import { z } from 'zod';

import {
	BOOLEAN,
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Leave Policy Schema
export const LEAVE_POLICY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const LEAVE_POLICY_NULL: Partial<ILeavePolicy> = {
	name: '',
	remarks: null,
};

export type ILeavePolicy = z.infer<typeof LEAVE_POLICY_SCHEMA>;

//* Leave Category Schema
export const LEAVE_CATEGORY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const LEAVE_CATEGORY_NULL: Partial<ILeaveCategory> = {
	name: '',
	remarks: null,
};

export type ILeaveCategory = z.infer<typeof LEAVE_CATEGORY_SCHEMA>;

//* Leave Configuration
export const LEAVE_CONFIG_SCHEMA = z.object({
	leave_policy_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	configuration_entry: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				leave_category_uuid: STRING_REQUIRED,
				number_of_leaves_to_provide_file: NUMBER_OPTIONAL,
				maximum_number_of_allowed_leaves: NUMBER_DOUBLE_REQUIRED,
				consecutive_days: NUMBER_DOUBLE_OPTIONAL,
				maximum_number_of_leaves_to_carry: NUMBER_DOUBLE_OPTIONAL,
				count_off_days_as_leaves: BOOLEAN_OPTIONAL,
				enable_previous_day_selection: BOOLEAN_OPTIONAL,
				maximum_number_of_leave_per_month: NUMBER_DOUBLE_OPTIONAL,
				previous_date_selected_limit: NUMBER_DOUBLE_OPTIONAL,
				applicability: z.enum(['both', 'male', 'female', 'other']),
				eligible_after_joining: NUMBER_DOUBLE_OPTIONAL,
				enable_pro_rata: BOOLEAN_OPTIONAL,
				max_avail_time: NUMBER_DOUBLE_OPTIONAL,
				leave_carry_type: z.enum(['none', 'fixed_amount', 'percentage']),
				enable_earned_leave: BOOLEAN_OPTIONAL,
			})
			.superRefine((value, ctx) => {
				if (value.enable_previous_day_selection && !value.previous_date_selected_limit) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['previous_date_selected_limit'],
					});
				}
			})
	),
});

export const LEAVE_CONFIG_NULL: Partial<ILeaveConfiguration> = {
	leave_policy_uuid: '',
	remarks: null,
	configuration_entry: [
		{
			uuid: undefined,
			leave_category_uuid: '',
			number_of_leaves_to_provide_file: 0,
			maximum_number_of_allowed_leaves: 0,
			consecutive_days: 0,
			maximum_number_of_leaves_to_carry: 0,
			count_off_days_as_leaves: false,
			enable_previous_day_selection: false,
			maximum_number_of_leave_per_month: 0,
			previous_date_selected_limit: 0,
			applicability: 'both',
			eligible_after_joining: 0,
			enable_pro_rata: false,
			leave_carry_type: 'fixed_amount',
			max_avail_time: 0,
			enable_earned_leave: false,
		},
	],
};

export type ILeaveConfiguration = z.infer<typeof LEAVE_CONFIG_SCHEMA>;

//* Leave Apply

export const LEAVE_APPLY_SCHEMA = z
	.object({
		employee_uuid: STRING_REQUIRED,
		leave_category_uuid: STRING_REQUIRED,
		year: NUMBER_REQUIRED,
		approval: z.enum(['approved', 'pending', 'rejected']),
		type: z.enum(['full', 'half']),
		from_date: STRING_REQUIRED,
		to_date: STRING_REQUIRED,
		reason: STRING_REQUIRED,
		file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_REQUIRED),
		remarks: STRING_NULLABLE,
	})


export const LEAVE_APPLY_NULL: Partial<ILeaveApply> = {
	employee_uuid: '',
	leave_category_uuid: '',
	year: Number(getYear(new Date())),
	approval: 'pending',
	type: 'full',
	from_date: '',
	to_date: '',
	reason: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type ILeaveApply = z.infer<typeof LEAVE_APPLY_SCHEMA>;
