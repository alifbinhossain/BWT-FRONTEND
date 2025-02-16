import { size } from 'lodash';
import { nullable, z } from 'zod';

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

const customIssue = (message: string, path: string) => ({
	code: z.ZodIssueCode.custom,
	message: message,
	path: [path],
});

//* Order Schema
export const ORDER_SCHEMA = z
	.object({
		is_new_customer: BOOLEAN_OPTIONAL.default(false),
		uuid: STRING_OPTIONAL,
		name: STRING_OPTIONAL,
		phone: STRING_OPTIONAL,
		business_type: STRING_OPTIONAL,
		is_diagnosis_need: BOOLEAN_REQUIRED.default(false),
		designation_uuid: STRING_OPTIONAL,
		department_uuid: STRING_OPTIONAL,
		user_uuid: STRING_NULLABLE,
		model_uuid: STRING_REQUIRED,
		size_uuid: STRING_REQUIRED,
		serial_no: STRING_REQUIRED,
		problems_uuid: STRING_ARRAY,
		problem_statement: STRING_REQUIRED,
		accessories: STRING_ARRAY_OPTIONAL,
		is_product_received: BOOLEAN_REQUIRED,
		receive_date: STRING_NULLABLE,
		warehouse_uuid: STRING_NULLABLE,
		rack_uuid: STRING_NULLABLE,
		floor_uuid: STRING_NULLABLE,
		box_uuid: STRING_NULLABLE,
		remarks: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		if (data?.problems_uuid.length === 0) {
			ctx.addIssue(customIssue('Required', 'problems_uuid'));
		}
		if (!data.is_new_customer && !data.user_uuid) {
			ctx.addIssue(customIssue('Required', 'user_uuid'));
		}
		if (data.is_new_customer) {
			if (!data.name) {
				ctx.addIssue(customIssue('Required', 'name'));
			}
			if (!data.phone) {
				ctx.addIssue(customIssue('Required', 'phone'));
			}
			if (!data.business_type) {
				ctx.addIssue(customIssue('Required', 'business_type'));
			}
			if (data.business_type === 'company') {
				if (!data.department_uuid) {
					ctx.addIssue(customIssue('Required', 'department_uuid'));
				}
				if (!data.designation_uuid) {
					ctx.addIssue(customIssue('Required', 'designation_uuid'));
				}
			}
		}
		if (data.is_product_received) {
			if (!data.receive_date) {
				ctx.addIssue(customIssue('Required', 'receive_date'));
			}
			if (!data.warehouse_uuid) {
				ctx.addIssue(customIssue('Required', 'warehouse_uuid'));
			}
		}
	});
export const ORDER_NULL: Partial<IJob> = {
	is_new_customer: false,
	uuid: '',
	user_uuid: null,
	is_diagnosis_need: false,
	name: '',
	phone: '',
	model_uuid: '',
	size_uuid: '',
	serial_no: '',
	problems_uuid: [],
	problem_statement: '',
	accessories: [],
	is_product_received: false,
	receive_date: '',
	warehouse_uuid: null,
	rack_uuid: null,
	floor_uuid: null,
	box_uuid: null,
	remarks: null,
};
export type IJob = z.infer<typeof ORDER_SCHEMA>;

//* Diagnosis Schema
export const DIAGNOSIS_SCHEMA = z.object({
	problems_uuid: STRING_ARRAY,
	problem_statement: STRING_OPTIONAL,
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
	name: STRING_OPTIONAL,
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
	name: STRING_OPTIONAL,
	category: STRING_OPTIONAL,
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
	problems_uuid: STRING_ARRAY_OPTIONAL,
	problem_statement: STRING_NULLABLE,
	status: BOOLEAN_OPTIONAL,
	status_update_date: STRING_NULLABLE,
	is_transferred_for_qc: BOOLEAN_OPTIONAL,
	is_ready_for_delivery: BOOLEAN_OPTIONAL,
	warehouse_uuid: STRING_REQUIRED,
	rack_uuid: STRING_NULLABLE,
	floor_uuid: STRING_NULLABLE,
	box_uuid: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const PROCESS_NULL: Partial<IWorkProcess> = {
	problems_uuid: [],
	problem_statement: null,
	status: undefined,
	status_update_date: undefined,
	is_transferred_for_qc: undefined,
	is_ready_for_delivery: undefined,
	warehouse_uuid: undefined,
	rack_uuid: undefined,
	floor_uuid: undefined,
	box_uuid: undefined,
	remarks: null,
};
export type IWorkProcess = z.infer<typeof PROCESS_SCHEMA>;

//* Transfer Process Section Schema
export const TRANSFER_PROCESS_SECTION_SCHEMA = z.object({
	entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			section_uuid: STRING_OPTIONAL,
			remarks: STRING_NULLABLE,
		})
	),
});
export const TRANSFER_PROCESS_SECTION_NULL: Partial<IWorkTransfer> = {
	entry: [
		{
			uuid: undefined,
			section_uuid: '',
			remarks: null,
		},
	],
};
export type IWorkTransfer = z.infer<typeof TRANSFER_PROCESS_SECTION_SCHEMA>;
