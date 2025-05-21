import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	FORTUNE_ZIP_EMAIL_PATTERN,
	NUMBER_REQUIRED,
	PASSWORD,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	department: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	department: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Designation Schema
export const DESIGNATION_SCHEMA = z.object({
	designation: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DESIGNATION_NULL: Partial<IDesignation> = {
	designation: '',
	remarks: null,
};

export type IDesignation = z.infer<typeof DESIGNATION_SCHEMA>;

//* User Schema
export const USER_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		user_type: z.enum(['employee', 'customer', 'vendor']),
		business_type: z.enum(['user', 'tv_company', 'corporate']).nullable(),
		price: z.number().min(1).max(5).optional(),
		rating: z.number().min(1).max(5).optional(),
		department_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		ext: STRING_NULLABLE,
		phone: PHONE_NUMBER_REQUIRED,
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema
			.extend({
				pass: STRING_OPTIONAL,
				repeatPass: STRING_OPTIONAL,
			})
			.superRefine((data, ctx) => {
				if (data.user_type === 'employee') {
					if (!data.department_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['department_uuid'],
						});
					if (!data.designation_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['designation_uuid'],
						});
				}
				if (data?.user_type === 'customer') {
					if (!data?.business_type) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['business_type'],
						});
					}
				}
			});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.repeatPass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['repeatPass'],
				});
			}
			if (data.user_type === 'employee') {
				if (!data.department_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['department_uuid'],
					});
				if (!data.designation_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['designation_uuid'],
					});
			}
		});
};

export const USER_NULL: Partial<IUser> = {
	name: '',
	email: '',
	department_uuid: null,
	user_type: 'employee',
	business_type: 'user',
	rating: undefined,
	price: undefined,
	designation_uuid: null,
	ext: null,
	phone: '',
	remarks: null,
};

export type IUser = z.infer<ReturnType<typeof USER_SCHEMA>>;
//* User Schema
export const EMPLOYEE_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		department_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		ext: STRING_NULLABLE,
		phone: STRING_REQUIRED.min(11).max(15),
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema.extend({
			pass: STRING_OPTIONAL,
			repeatPass: STRING_OPTIONAL,
		});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.repeatPass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['repeatPass'],
				});
			}
		});
};

export const EMPLOYEE_NULL: Partial<IEmployee> = {
	name: '',
	email: '',
	department_uuid: null,
	designation_uuid: null,
	ext: null,
	phone: '',
	remarks: null,
};

export type IEmployee = z.infer<ReturnType<typeof EMPLOYEE_SCHEMA>>;

//* Reset Password Schema
export const RESET_PASSWORD_SCHEMA = z
	.object({
		pass: PASSWORD,
		repeatPass: PASSWORD,
	})
	.refine((data) => data.pass === data.repeatPass, {
		message: 'Passwords do not match',
		path: ['repeatPass'],
	});

export const RESET_PASSWORD_NULL: Partial<IResetPasswordSchema> = {
	pass: '',
	repeatPass: '',
};

export type IResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;

//* Manual Entry Schema
export const MANUAL_ENTRY_SCHEMA = z
	.object({
		employee_uuid: STRING_REQUIRED,
		device_uuid: STRING_NULLABLE,
		entry_time: STRING_NULLABLE,
		exit_time: STRING_NULLABLE,
		reason: STRING_REQUIRED,
		area: STRING_NULLABLE,
		type: z.enum(['field_visit', 'manual_entry', 'missing_punch']),
	})
	.superRefine((data, ctx) => {
		if (data.type === 'field_visit' || data.type === 'manual_entry') {
			if (!data.entry_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['entry_time'],
				});
			}
			if (!data.exit_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['exit_time'],
				});
			}
		}

		if (data.type === 'missing_punch') {
			if (!data.device_uuid) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['device_uuid'],
				});
			}

			if (!data.exit_time) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['exit_time'],
				});
			}
		}
	});

export const MANUAL_ENTRY_NULL: Partial<IManualEntry> = {
	employee_uuid: '',
	device_uuid: null,
	entry_time: '',
	exit_time: '',
	reason: '',
	area: null,
};

export type IManualEntry = z.infer<typeof MANUAL_ENTRY_SCHEMA>;

//* Device List Schema
export const DEVICE_LIST_SCHEMA = z.object({
	name: STRING_REQUIRED,
	identifier: NUMBER_REQUIRED,
	location: STRING_NULLABLE,
	connection_status: BOOLEAN_REQUIRED,
	phone_number: STRING_NULLABLE,
	description: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const DEVICE_LIST_NULL: Partial<IDeviceList> = {
	name: '',
	location: null,
	connection_status: false,
	phone_number: null,
	description: null,
};

export type IDeviceList = z.infer<typeof DEVICE_LIST_SCHEMA>;
