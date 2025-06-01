import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Salary Schema
export const SALARY_SCHEMA = z.object({
	employee_uuid: STRING_REQUIRED,
	type: STRING_REQUIRED,
	amount: NUMBER_DOUBLE_REQUIRED,
	month: NUMBER_REQUIRED.min(1).max(12),
	year: NUMBER_REQUIRED.min(1900, { message: 'Year must be 1900 or later' }).max(new Date().getFullYear(), {
		message: `Year can't be in the future`,
	}),
});

export const SALARY_NULL: Partial<ISalary> = {
	employee_uuid: '',
	type: '',
	amount: 0,
	month: 0,
	year: 0,
};

export type ISalary = z.infer<typeof SALARY_SCHEMA>;

//* Salary Increment Schema
export const SALARY_INCREMENT_SCHEMA = z.object({
	employee_uuid: STRING_REQUIRED,
	amount: NUMBER_DOUBLE_REQUIRED,
	effective_date: STRING_REQUIRED,
});

export const SALARY_INCREMENT_NULL: Partial<ISalaryIncrement> = {
	employee_uuid: '',
	amount: 0,
	effective_date: '',
};

export type ISalaryIncrement = z.infer<typeof SALARY_INCREMENT_SCHEMA>;
