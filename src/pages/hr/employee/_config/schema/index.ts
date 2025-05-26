import { z } from 'zod';

import {
	FORTUNE_ZIP_EMAIL_PATTERN,
	GENDER,
	PASSWORD,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

export const EMPLOYEE_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		employee_id: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		gender: GENDER,

		start_date: STRING_NULLABLE,
		end_date: STRING_NULLABLE,
		workplace_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		department_uuid: STRING_NULLABLE,
		sub_department_uuid: STRING_NULLABLE,
		report_position: STRING_NULLABLE,
		rfid: STRING_NULLABLE,
		primary_display_text: STRING_NULLABLE,
		secondary_display_text: STRING_NULLABLE,
		leave_policy_uuid: STRING_NULLABLE,
		employment_type_uuid: STRING_NULLABLE,
		shift_group_uuid: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema.extend({
			pass: STRING_OPTIONAL,
			confirm_pass: STRING_OPTIONAL,
		});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			confirm_pass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.confirm_pass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['confirm_pass'],
				});
			}
		});
};

export const EMPLOYEE_NULL: Partial<IEmployee> = {
	name: '',
	employee_id: '',
	email: '',
	pass: '',
	confirm_pass: '',
	gender: 'male',

	start_date: null,
	end_date: null,
	workplace_uuid: null,
	designation_uuid: null,
	department_uuid: null,
	sub_department_uuid: null,
	report_position: null,
	rfid: null,
	primary_display_text: null,
	secondary_display_text: null,
	leave_policy_uuid: null,
	employment_type_uuid: null,
	shift_group_uuid: null,
};

export type IEmployee = z.infer<ReturnType<typeof EMPLOYEE_SCHEMA>>;

export const EMPLOYEE_DEVICE_SCHEMA = z
	.object({
		device_list_uuid: z.array(STRING_REQUIRED).min(1, 'At least one device is required'),
		permission_type: STRING_REQUIRED.default('permanent'),
		temporary_from_date: z.string().nullable(),
		temporary_to_date: z.string().nullable(),
	})
	.superRefine((data, ctx) => {
		if (data.permission_type === 'temporary') {
			if (!data.temporary_from_date) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['temporary_from_date'],
				});
			}
			if (!data.temporary_to_date) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['temporary_to_date'],
				});
			}
		}
	});

export const EMPLOYEE_DEVICE_NULL: Partial<IEmployeeDevice> = {
	device_list_uuid: [],
	permission_type: 'permanent',
	temporary_from_date: null,
	temporary_to_date: null,
};

export type IEmployeeDevice = z.infer<typeof EMPLOYEE_DEVICE_SCHEMA>;
