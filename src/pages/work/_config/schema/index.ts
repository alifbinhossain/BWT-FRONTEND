import { z } from 'zod';

import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_DOUBLE_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
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

//*Order Schema
export const ORDER_SCHEMA = z
	.object({
		uuid: STRING_OPTIONAL,
		is_diagnosis_need: BOOLEAN_REQUIRED.default(false),
		is_transferred_for_qc: BOOLEAN_OPTIONAL.default(false),
		is_ready_for_delivery: BOOLEAN_OPTIONAL.default(false),
		is_proceed_to_repair: BOOLEAN_REQUIRED.default(false),
		is_challan_needed: BOOLEAN_REQUIRED.default(false),
		is_home_repair: BOOLEAN_REQUIRED.default(false),
		brand_uuid: STRING_REQUIRED,
		model_uuid: STRING_REQUIRED,
		model_id: STRING_OPTIONAL,
		quantity: NUMBER_DOUBLE_REQUIRED,
		proposed_cost: NUMBER_DOUBLE_OPTIONAL,
		bill_amount: NUMBER_DOUBLE_OPTIONAL.default(0),
		serial_no: STRING_OPTIONAL,
		problems_uuid: STRING_ARRAY,
		problem_statement: STRING_REQUIRED,
		qc_problems_uuid: STRING_ARRAY_OPTIONAL,
		qc_problem_statement: STRING_NULLABLE,
		delivery_problems_uuid: STRING_ARRAY_OPTIONAL,
		delivery_problem_statement: STRING_NULLABLE,
		accessories: STRING_ARRAY_OPTIONAL,
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
		if (data?.is_home_repair && !(data?.bill_amount > 0)) {
			ctx.addIssue(customIssue('Required', 'bill_amount'));
		}
		if (data?.is_home_repair && !(typeof data?.proposed_cost === 'number' && data.proposed_cost > 0)) {
			ctx.addIssue(customIssue('Required', 'proposed_cost'));
		}
	});
export const ORDER_NULL: Partial<IOrder> = {
	is_diagnosis_need: false,
	is_transferred_for_qc: false,
	is_ready_for_delivery: false,
	is_proceed_to_repair: false,
	bill_amount: 0,
	proposed_cost: 0,
	brand_uuid: '',
	model_uuid: '',
	serial_no: '',
	quantity: 1,
	problems_uuid: [],
	problem_statement: '',
	accessories: [],
	warehouse_uuid: null,
	rack_uuid: null,
	floor_uuid: null,
	box_uuid: null,
	remarks: null,
};
export type IOrder = z.infer<typeof ORDER_SCHEMA>;
//*Order Schema
export const REPAIR_SCHEMA = z
	.object({
		uuid: STRING_OPTIONAL,
		is_transferred_for_qc: BOOLEAN_OPTIONAL.default(false),
		is_ready_for_delivery: BOOLEAN_OPTIONAL.default(false),
		repairing_problems_uuid: STRING_ARRAY,
		repairing_problem_statement: STRING_OPTIONAL,
		repair_product_transfer: BOOLEAN_OPTIONAL.default(false),
		product_transfer: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				product_uuid: STRING_OPTIONAL,
				quantity: NUMBER_DOUBLE_OPTIONAL,
				warehouse_uuid: STRING_OPTIONAL,
				remarks: STRING_NULLABLE,
			})
		),
		remarks: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		if (data?.repair_product_transfer) {
			data?.product_transfer.map((transfer, index) => {
				if (!transfer.product_uuid) {
					ctx.addIssue(customIssue('Required', `product_transfer[${index}].product_uuid`));
				}
				if (!transfer.quantity) {
					ctx.addIssue(customIssue('Required', `product_transfer[${index}].quantity`));
				}
				if (!transfer.warehouse_uuid) {
					ctx.addIssue(customIssue('Required', `product_transfer[${index}].warehouse_uuid`));
				}
			});
		}
	});

export const REPAIR_NULL: Partial<IRepair> = {
	is_transferred_for_qc: false,
	is_ready_for_delivery: false,
	repair_product_transfer: false,
	product_transfer: [
		{
			uuid: '',
			product_uuid: '',
			quantity: 0,
			warehouse_uuid: '',
			remarks: null,
		},
	],
	remarks: null,
};
export type IRepair = z.infer<typeof REPAIR_SCHEMA>;

//* Info Schema
const ORDER_SCHEMA_FOR_INFO = (ORDER_SCHEMA as any)._def.schema.omit({
	is_transferred_for_qc: true,
	is_ready_for_delivery: true,
	delivery_problem_statement: true,
	qc_problem_statement: true,
});
export const INFO_SCHEMA = z
	.object({
		is_new_customer: BOOLEAN_OPTIONAL.default(false),
		uuid: STRING_OPTIONAL,
		user_uuid: STRING_NULLABLE,
		name: STRING_OPTIONAL,
		phone: PHONE_NUMBER_OPTIONAL,
		business_type: STRING_OPTIONAL,
		where_they_find_us: z.enum(['whatsapp', 'instagram', 'facebook', 'youtube', 'person', 'none']).optional(),
		designation_uuid: STRING_OPTIONAL,
		department_uuid: STRING_OPTIONAL,
		is_product_received: BOOLEAN_REQUIRED,
		location: STRING_REQUIRED,
		zone_uuid: STRING_REQUIRED,
		received_date: STRING_NULLABLE,
		remarks: STRING_NULLABLE,
		order_entry: z.array(ORDER_SCHEMA_FOR_INFO),
	})
	.superRefine((data, ctx) => {
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
		}

		if (data.is_product_received) {
			if (!data.received_date) {
				ctx.addIssue(customIssue('Required', 'received_date'));
			}
			data?.order_entry.map((entry, index) => {
				if (!entry.warehouse_uuid && !entry.is_home_repair) {
					ctx.addIssue(customIssue('Required', `order_entry[${index}].warehouse_uuid`));
				}
				if (!entry.serial_no) {
					ctx.addIssue(customIssue('Required', `order_entry[${index}].serial_no`));
				}
			});
		}
	});
export const INFO_NULL: Partial<IInfo> = {
	is_new_customer: false,
	uuid: '',
	user_uuid: null,
	is_product_received: false,
	received_date: null,
	where_they_find_us: 'none',
	name: '',
	phone: undefined,
	order_entry: [ORDER_NULL as IOrder],
	remarks: null,
};

export type IInfo = z.infer<typeof INFO_SCHEMA>;

//* Diagnosis Schema
export const DIAGNOSIS_SCHEMA = z.object({
	problems_uuid: STRING_ARRAY,
	problem_statement: STRING_NULLABLE,
	customer_problem_statement: STRING_NULLABLE,
	status: z.enum(['pending', 'rejected', 'accepted', 'not_repairable']),
	proposed_cost: NUMBER_DOUBLE_REQUIRED,
	is_proceed_to_repair: BOOLEAN_OPTIONAL.default(false),
	remarks: STRING_NULLABLE,
	customer_remarks: STRING_NULLABLE,
});
export const DIAGNOSIS_NULL: Partial<IDiagnosis> = {
	problems_uuid: [],
	problem_statement: null,
	customer_problem_statement: null,
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
	name: STRING_REQUIRED,
	category: z.enum(['customer', 'employee']),
	remarks: STRING_NULLABLE,
});
export const PROBLEM_NULL: Partial<IProblem> = {
	uuid: '',
	name: '',
	category: 'customer',
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

//* Zone Schema
export const ZONE_SCHEMA = z.object({
	name: STRING_OPTIONAL,
	division: STRING_REQUIRED,
	latitude: STRING_OPTIONAL,
	longitude: STRING_OPTIONAL,
	remarks: STRING_NULLABLE,
});
export const ZONE_NULL: Partial<IWorkZone> = {
	name: '',
	division: '',
	latitude: undefined,
	longitude: undefined,
	remarks: null,
};
export type IWorkZone = z.infer<typeof ZONE_SCHEMA>;

//* Accessories Schema
export const ACCESSORIES_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	name: STRING_OPTIONAL,
	remarks: STRING_NULLABLE,
});
export const ACCESSORIES_NULL: Partial<IAccessories> = {
	uuid: '',
	name: '',
	remarks: null,
};
export type IAccessories = z.infer<typeof ACCESSORIES_SCHEMA>;
//* Transfer Schema
export const TRANSFER_SCHEMA = z.object({
	product_uuid: STRING_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TRANSFER_NULL: Partial<ITransfer> = {
	product_uuid: '',
	warehouse_uuid: '',
	quantity: 0,
	remarks: null,
};

export type ITransfer = z.infer<typeof TRANSFER_SCHEMA>;
