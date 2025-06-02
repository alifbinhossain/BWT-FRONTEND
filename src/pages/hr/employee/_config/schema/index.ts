import { z } from 'zod';

import {
	FORTUNE_ZIP_EMAIL_PATTERN,
	GENDER,
	NUMBER_DOUBLE,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_DOUBLE_REQUIRED,
	PASSWORD,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

export const EMPLOYEE_SCHEMA = z.object({
	user_uuid: STRING_REQUIRED,
	employee_id: STRING_REQUIRED,
	gender: GENDER,
	start_date: STRING_NULLABLE,
	end_date: STRING_NULLABLE,
	workplace_uuid: STRING_NULLABLE,
	sub_department_uuid: STRING_NULLABLE,
	report_position: STRING_NULLABLE,
	rfid: STRING_NULLABLE,
	primary_display_text: STRING_NULLABLE,
	secondary_display_text: STRING_NULLABLE,
	leave_policy_uuid: STRING_NULLABLE,
	employment_type_uuid: STRING_NULLABLE,
	shift_group_uuid: STRING_NULLABLE,
	joining_amount: NUMBER_DOUBLE_REQUIRED.min(1, 'Joining amount must be greater than 0'),
});

export const EMPLOYEE_NULL: Partial<IEmployee> = {
	user_uuid: '',
	employee_id: '',
	gender: 'male',
	start_date: null,
	end_date: null,
	workplace_uuid: null,
	sub_department_uuid: null,
	report_position: null,
	rfid: null,
	primary_display_text: null,
	secondary_display_text: null,
	leave_policy_uuid: null,
	employment_type_uuid: null,
	shift_group_uuid: null,
	joining_amount: 0,
};

export type IEmployee = z.infer<typeof EMPLOYEE_SCHEMA>;

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
