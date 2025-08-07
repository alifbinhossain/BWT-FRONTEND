import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	status: BOOLEAN_REQUIRED,
	hierarchy: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	name: '',
	hierarchy: 0,
	status: false,
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Designation Schema
export const DESIGNATION_SCHEMA = z.object({
	designation: STRING_REQUIRED,
	hierarchy: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DESIGNATION_NULL: Partial<IDesignation> = {
	designation: '',
	hierarchy: 0,
	remarks: null,
};

export type IDesignation = z.infer<typeof DESIGNATION_SCHEMA>;

//* Employee Type Schema
export const EMPLOYEE_TYPE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	status: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const EMPLOYEE_TYPE_NULL: Partial<IEmployeeType> = {
	name: '',
	status: true,
	remarks: null,
};

export type IEmployeeType = z.infer<typeof EMPLOYEE_TYPE_SCHEMA>;

//* Holiday Schema
export const HOLIDAY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	date: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const HOLIDAY_NULL: Partial<IHoliday> = {
	name: '',
	date: '',
	remarks: null,
};

export type IHoliday = z.infer<typeof HOLIDAY_SCHEMA>;

//* Special Days schema
export const SPECIAL_DAYS_SCHEMA = z.object({
	name: STRING_REQUIRED,
	workplace_uuid: STRING_REQUIRED,
	from_date: STRING_REQUIRED,
	to_date: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SPECIAL_DAYS_NULL: Partial<ISpecialDays> = {
	name: '',
	workplace_uuid: '',
	from_date: '',
	to_date: '',
	remarks: null,
};
export type ISpecialDays = z.infer<typeof SPECIAL_DAYS_SCHEMA>;

export const SUB_DEPARTMENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	hierarchy: NUMBER_REQUIRED,
	status: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SUB_DEPARTMENT_NULL: Partial<ISubDepartment> = {
	name: '',
	hierarchy: 0,
	status: true,
	remarks: null,
};

export type ISubDepartment = z.infer<typeof SUB_DEPARTMENT_SCHEMA>;

export const WORKPLACE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	hierarchy: NUMBER_REQUIRED,
	status: BOOLEAN_REQUIRED,
	latitude: NUMBER_DOUBLE_OPTIONAL,
	longitude: NUMBER_DOUBLE_OPTIONAL,
	remarks: STRING_NULLABLE,
});

export const WORKPLACE_NULL: Partial<IWorkplace> = {
	name: '',
	hierarchy: 0,
	status: true,
	latitude: 0,
	longitude: 0,
	remarks: null,
};

export type IWorkplace = z.infer<typeof WORKPLACE_SCHEMA>;
