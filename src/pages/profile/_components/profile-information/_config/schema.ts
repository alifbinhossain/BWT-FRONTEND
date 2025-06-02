import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	DOCUMENT_TYPE,
	FILE,
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

//* PERSONAL CONTACT INFO SCHEMA
export const PERSONAL_CONTACT_INFO_SCHEMA = z.object({
	father_name: STRING_NULLABLE,
	mother_name: STRING_NULLABLE,
	blood_group: STRING_NULLABLE,
	dob: STRING_NULLABLE,
	national_id: STRING_NULLABLE,
	office_phone: STRING_NULLABLE,
	home_phone: STRING_NULLABLE,
	personal_phone: STRING_NULLABLE,
});

export const PERSONAL_CONTACT_INFO_NULL: Partial<IPersonalContactInfo> = {
	father_name: '',
	mother_name: '',
	blood_group: '',
	dob: '',
	national_id: '',
	office_phone: '',
	home_phone: '',
	personal_phone: '',
};

export type IPersonalContactInfo = z.infer<typeof PERSONAL_CONTACT_INFO_SCHEMA>;

//* PERSONAL CONTACT INFO SCHEMA
export const APPROVER_SCHEMA = z.object({
	first_leave_approver_uuid: STRING_NULLABLE,
	second_leave_approver_uuid: STRING_NULLABLE,
	first_late_approver_uuid: STRING_NULLABLE,
	second_late_approver_uuid: STRING_NULLABLE,
	first_manual_entry_approver_uuid: STRING_NULLABLE,
	second_manual_entry_approver_uuid: STRING_NULLABLE,
});

export const APPROVER_NULL: Partial<IApprover> = {
	first_leave_approver_uuid: null,
	second_leave_approver_uuid: null,
	first_late_approver_uuid: null,
	second_late_approver_uuid: null,
	first_manual_entry_approver_uuid: null,
	second_manual_entry_approver_uuid: null,
};

export type IApprover = z.infer<typeof APPROVER_SCHEMA>;

//* EMPLOYMENT HISTORY SCHEMA
export const EMPLOYMENT_HISTORY_SCHEMA = z.object({
	company_name: STRING_REQUIRED,
	company_business: STRING_REQUIRED,
	start_date: STRING_REQUIRED,
	end_date: STRING_REQUIRED,
	department: STRING_REQUIRED,
	designation: STRING_REQUIRED,
	location: STRING_REQUIRED,
	responsibilities: STRING_REQUIRED,
});

export const EMPLOYMENT_HISTORY_NULL: Partial<IEmploymentHistory> = {
	company_name: '',
	company_business: '',
	start_date: '',
	end_date: '',
	department: '',
	designation: '',
	location: '',
	responsibilities: '',
};

export type IEmploymentHistory = z.infer<typeof EMPLOYMENT_HISTORY_SCHEMA>;

//* EMPLOYEE EDUCATION SCHEMA
export const EMPLOYEE_EDUCATION_SCHEMA = z.object({
	degree_name: STRING_REQUIRED,
	institute: STRING_REQUIRED,
	board: STRING_REQUIRED,
	year_of_passing: NUMBER_REQUIRED,
	grade: STRING_REQUIRED,
});

export const EMPLOYEE_EDUCATION_NULL: Partial<IEmployeeEducation> = {
	degree_name: '',
	institute: '',
	board: '',
	grade: '',
};

export type IEmployeeEducation = z.infer<typeof EMPLOYEE_EDUCATION_SCHEMA>;

//* EMPLOYEE ADDRESS SCHEMA
export const EMPLOYEE_ADDRESS_SCHEMA = z.object({
	address: STRING_REQUIRED,
	thana: STRING_REQUIRED,
	district: STRING_REQUIRED,
	address_type: z.enum(['permanent', 'present']),
});

export const EMPLOYEE_ADDRESS_NULL: Partial<IEmployeeAddress> = {
	address: '',
	thana: '',
	district: '',
	address_type: 'permanent',
};

export type IEmployeeAddress = z.infer<typeof EMPLOYEE_ADDRESS_SCHEMA>;

//* EMPLOYEE DOCUMENT SCHEMA
export const EMPLOYEE_DOCUMENT_SCHEMA = z.object({
	document_type: DOCUMENT_TYPE,
	description: STRING_REQUIRED,
	file: FILE,
});

export const EMPLOYEE_DOCUMENT_NULL: Partial<IEmployeeDocument> = {
	file: new File([''], 'filename') as File,
	document_type: 'ssc',
	description: '',
};

export type IEmployeeDocument = z.infer<typeof EMPLOYEE_DOCUMENT_SCHEMA>;

//* CHANGE PASSWORD SCHEMA
export const CHANGE_PASSWORD_SCHEMA = z
	.object({
		current_pass: PASSWORD,
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

export const CHANGE_PASSWORD_NULL: Partial<IChangePassword> = {
	current_pass: '',
	pass: '',
	confirm_pass: '',
};

export type IChangePassword = z.infer<typeof CHANGE_PASSWORD_SCHEMA>;
