import { size } from 'lodash';
import { z } from 'zod';

import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	STRING_ARRAY,
	STRING_ARRAY_OPTIONAL,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Order Schema
export const ORDER_SCHEMA = z
	.object({
		is_new_customer: BOOLEAN_REQUIRED,
		uuid: STRING_OPTIONAL,
		name: STRING_OPTIONAL,
		phone_no: STRING_OPTIONAL,
		user_uuid: STRING_OPTIONAL,
		model_uuid: STRING_REQUIRED,
		size_uuid: STRING_REQUIRED,
		serial_no: STRING_REQUIRED,
		problems_uuid: STRING_ARRAY,
		problem_statement: STRING_REQUIRED,
		accessories: STRING_ARRAY_OPTIONAL,
		is_product_received: BOOLEAN_REQUIRED,
		receive_date: STRING_OPTIONAL,
		warehouse_uuid: STRING_REQUIRED,
		rack_uuid: STRING_OPTIONAL,
		floor_uuid: STRING_OPTIONAL,
		box_uuid: STRING_OPTIONAL,
		remarks: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		if (!data.is_new_customer && !data.user_uuid) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please select user',
				path: ['user_uuid'],
			});
		}
		if (data.is_new_customer && (!data.name || !data.phone_no)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required',
				path: ['name'],
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required',
				path: ['phone_no'],
			});
		}
	});
export const ORDER_NULL: Partial<IJob> = {
	is_new_customer: false,
	uuid: '',
	user_uuid: '',
	name: '',
	phone_no: '',
	model_uuid: '',
	size_uuid: '',
	serial_no: '',
	problems_uuid: [],
	problem_statement: '',
	accessories: [],
	is_product_received: false,
	receive_date: '',
	warehouse_uuid: '',
	rack_uuid: '',
	floor_uuid: '',
	box_uuid: '',
	remarks: null,
};
export type IJob = z.infer<typeof ORDER_SCHEMA>;

//* Diagnosis Schema
export const DIAGNOSIS_SCHEMA = z.object({
	problems_uuid: STRING_ARRAY,
	problem_statement: STRING_REQUIRED,
	status: z.enum(['pending', 'rejected', 'accepted', 'not_repairable']),
	proposed_cost: NUMBER_DOUBLE_REQUIRED,
	is_proceed_to_repair: BOOLEAN_OPTIONAL.default(false),
	remarks: STRING_NULLABLE,
});
export const DIAGNOSIS_NULL: Partial<IDiagnosis> = {
	problems_uuid: [],
	problem_statement: '',
	status: 'pending',
	proposed_cost: 0,
	is_proceed_to_repair: false,
	remarks: null,
};
export type IDiagnosis = z.infer<typeof DIAGNOSIS_SCHEMA>;

//* Section Schema
export const SECTION_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const SECTION_NULL: Partial<ISection> = {
	uuid: '',
	name: '',
	remarks: null,
};
export type ISection = z.infer<typeof SECTION_SCHEMA>;

//* Problem Schema
export const PROBLEM_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	name: STRING_REQUIRED,
	category: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const PROBLEM_NULL: Partial<IProblem> = {
	uuid: '',
	name: '',
	category: '',
	remarks: null,
};
export type IProblem = z.infer<typeof PROBLEM_SCHEMA>;
//* Process Schema
export const PROCESS_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	section_uuid: STRING_REQUIRED,
	diagnosis_uuid: STRING_REQUIRED,
	engineer_uuid: STRING_REQUIRED,
	problems_uuid: STRING_ARRAY,
	problem_statement: STRING_REQUIRED,
	status: BOOLEAN_REQUIRED,
	status_update_date: STRING_REQUIRED,
	is_transferred_for_qc: BOOLEAN_REQUIRED,
	is_ready_for_delivery: BOOLEAN_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	rack_uuid: STRING_REQUIRED,
	floor_uuid: STRING_REQUIRED,
	box_uuid: STRING_REQUIRED,
	process_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const PROCESS_NULL: Partial<IProcess> = {
	uuid: '',
	section_uuid: '',
	diagnosis_uuid: '',
	engineer_uuid: '',
	problems_uuid: [],
	problem_statement: '',
	status: false,
	status_update_date: '',
	is_transferred_for_qc: false,
	is_ready_for_delivery: false,
	warehouse_uuid: '',
	rack_uuid: '',
	floor_uuid: '',
	box_uuid: '',
	process_uuid: '',
	remarks: null,
};
export type IProcess = z.infer<typeof PROCESS_SCHEMA>;
