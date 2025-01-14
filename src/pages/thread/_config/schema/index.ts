import { z } from 'zod';

import {
	BOOLEAN_DEFAULT_VALUE,
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Thread Order Info Entry Schema
export const THREAD_ORDER_INFO_ENTRY_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	marketing_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	merchandiser_uuid: STRING_REQUIRED,
	buyer_uuid: STRING_REQUIRED,
	is_sample: BOOLEAN_REQUIRED.default(false),
	is_bill: BOOLEAN_REQUIRED.default(false),
	is_cash: BOOLEAN_REQUIRED.default(false),
	delivery_date: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
	order_info_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			color: STRING_REQUIRED,
			style: STRING_REQUIRED,
			count_length_uuid: STRING_REQUIRED,
			bleaching: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.gt(0, 'Quantity must be more than 0'),
			company_price: NUMBER_DOUBLE_REQUIRED,
			party_price: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const THREAD_ORDER_INFO_ENTRY_NULL: Partial<IThreadOrderInfoEntry> = {
	is_sample: false,
	is_bill: false,
	is_cash: false,
	remarks: '',
	delivery_date: null,
	order_info_entry: [],
};

export type IThreadOrderInfoEntry = z.infer<typeof THREAD_ORDER_INFO_ENTRY_SCHEMA>;

// Thread Count Length Schema
export const THREAD_COUNT_LENGTH_SCHEMA = z.object({
	count: STRING_REQUIRED,
	length: NUMBER_REQUIRED,
	// min_weight: NUMBER_DOUBLE_REQUIRED.max(
	// 	yup.ref('max_weight'),
	// 	'Beyond Max Weight'
	// ),
	min_weight: NUMBER_DOUBLE_REQUIRED, // TODO: Fix this
	// max_weight: NUMBER_DOUBLE_REQUIRED.min(
	// 	yup.ref('min_weight'),
	// 	'Less than Min Weight'
	// ),
	max_weight: NUMBER_DOUBLE_REQUIRED, // TODO: Fix this
	con_per_carton: NUMBER_REQUIRED.default(0),
	price: NUMBER_DOUBLE_REQUIRED,
	sst: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const THREAD_COUNT_LENGTH_NULL: Partial<IThreadCountLength> = {
	count: '',
	con_per_carton: 0,
	sst: '',
	remarks: '',
};

export type IThreadCountLength = z.infer<typeof THREAD_COUNT_LENGTH_SCHEMA>;

// Thread Coning Schema
export const THREAD_CONING_SCHEMA = z.object({
	coning_operator: STRING_REQUIRED,
	coning_supervisor: STRING_REQUIRED,
	coning_machines: STRING_REQUIRED,
	batch_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			// coning_production_quantity: NUMBER_REQUIRED.max(
			// 	yup.ref('quantity'),
			// 	'Beyond Max Quantity'
			// ),
			coning_production_quantity: NUMBER_REQUIRED, // TODO: Fix this
			coning_production_quantity_in_kg: NUMBER_REQUIRED,
			// transfer_quantity: NUMBER_REQUIRED.max(
			// 	yup.ref('quantity'),
			// 	'Beyond Max Quantity'
			// ),
			transfer_quantity: NUMBER_REQUIRED, // TODO: Fix this
		})
	),
});

export const THREAD_CONING_NULL: Partial<IThreadConing> = {
	coning_operator: '',
	coning_supervisor: '',
	coning_machines: '',
	batch_entry: [],
};

export type IThreadConing = z.infer<typeof THREAD_CONING_SCHEMA>;

// Thread Challan Schema
export const THREAD_CHALLAN_SCHEMA = z.object({
	received: BOOLEAN_DEFAULT_VALUE(false),
	gate_pass: BOOLEAN_DEFAULT_VALUE(false),
	assign_to: STRING_REQUIRED,
	order_info_uuid: STRING_REQUIRED,
	carton_quantity: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const THREAD_CHALLAN_NULL: Partial<IThreadChallan> = {
	received: false,
	gate_pass: false,
	remarks: null,
};

export type IThreadChallan = z.infer<typeof THREAD_CHALLAN_SCHEMA>;
