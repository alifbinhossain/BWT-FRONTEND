import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	FORTUNE_ZIP_EMAIL_PATTERN,
	GENDER,
	NUMBER_REQUIRED,
	PASSWORD,
	PHONE_NUMBER_REQUIRED,
	STRING,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* GENERAL INFORMATION SCHEMA
export const GENERAL_INFO_SCHEMA = z.object({
	employee_name: STRING_OPTIONAL,
	employee_id: STRING_REQUIRED,
	email: STRING_OPTIONAL,
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
	line_manager_uuid: STRING_NULLABLE,
	hr_manager_uuid: STRING_NULLABLE,
});

export const GENERAL_INFO_NULL: Partial<IGeneralInfo> = {
	employee_name: '',
	employee_id: '',
	email: '',
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
	line_manager_uuid: null,
	hr_manager_uuid: null,
};

export type IGeneralInfo = z.infer<typeof GENERAL_INFO_SCHEMA>;
