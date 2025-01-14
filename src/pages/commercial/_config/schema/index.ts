import { z } from 'zod';

import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	JSON_STRING,
	JSON_STRING_REQUIRED,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// LC
export const LC_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	lc_number: STRING_REQUIRED,
	lc_date: STRING_REQUIRED,
	payment_value: NUMBER_DOUBLE_REQUIRED,
	ldbc_fdbc: STRING_NULLABLE,
	commercial_executive: STRING_REQUIRED,
	party_bank: STRING_REQUIRED,
	production_complete: BOOLEAN_REQUIRED,
	lc_cancel: BOOLEAN_REQUIRED,
	problematical: BOOLEAN_REQUIRED,
	epz: BOOLEAN_REQUIRED,
	is_rtgs: BOOLEAN_REQUIRED,
	is_old_pi: BOOLEAN_REQUIRED,

	// if is_old_pi = true
	// pi_number: STRING.when('is_old_pi', {
	// 	is: true,
	// 	then: (Schema) => Schema.required('required'),
	// 	otherwise: (Schema) =>
	// 		Schema.nullable().transform((value, originalValue) =>
	// 			String(originalValue).trim() === '' ? null : value
	// 		),
	// }),
	pi_number: STRING_OPTIONAL,
	// lc_value: NUMBER.when('is_old_pi', {
	// 	is: true,
	// 	then: (Schema) =>
	// 		Schema.required('required').moreThan(0, 'More than 0'),
	// 	otherwise: (Schema) => Schema.nullable(),
	// }),
	lc_value: NUMBER_OPTIONAL,

	// * Progression
	handover_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	document_receive_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	acceptance_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	maturity_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	payment_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),

	shipment_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	expiry_date: STRING_NULLABLE.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	ud_no: STRING_NULLABLE,
	ud_received: STRING_NULLABLE,
	at_sight: STRING_REQUIRED,
	amd_date: STRING_NULLABLE.transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value)),
	amd_count: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
	// pi: yup.array().of(
	// 	yup.object().shape({
	// 		uuid: STRING.when('is_old_pi', {
	// 			is: true,
	// 			then: (Schema) => Schema.required('required'),
	// 			otherwise: (Schema) =>
	// 				Schema.nullable().transform((value, originalValue) =>
	// 					String(originalValue).trim() === '' ? null : value
	// 				),
	// 		}),
	// 	})
	// ),
	pi: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
		})
	),
});

export const LC_NULL: Partial<ILC> = {
	payment_value: 0,
	payment_date: null,
	ldbc_fdbc: null,
	acceptance_date: null,
	maturity_date: null,
	production_complete: false,
	lc_cancel: false,
	handover_date: null,
	document_receive_date: null,
	shipment_date: null,
	expiry_date: null,
	ud_no: null,
	ud_received: null,
	amd_date: null,
	amd_count: 0,
	problematical: false,
	epz: false,
	remarks: null,
	pi: [],
};

export type ILC = z.infer<typeof LC_SCHEMA>;

// PI
export const PI_SCHEMA = z.object({
	lc_uuid: STRING_NULLABLE,
	marketing_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	order_info_uuids: JSON_STRING_REQUIRED,
	thread_order_info_uuids: JSON_STRING.optional(),
	new_order_info_uuids: JSON_STRING.optional(),
	new_order_info_thread_uuids: JSON_STRING.optional(),
	merchandiser_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	bank_uuid: STRING_REQUIRED,
	validity: NUMBER_REQUIRED,
	payment: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
	weight: NUMBER_DOUBLE_OPTIONAL,
	pi_cash_entry: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				is_checked: BOOLEAN_OPTIONAL,
				sfg_uuid: STRING_NULLABLE,
				max_quantity: NUMBER_REQUIRED,
				// pi_cash_quantity: yup.number().when('is_checked', {
				// 	is: true,
				// 	then: (Schema) =>
				// 		Schema.typeError('Must be a number')
				// 			.required('Quantity is required')
				// 			.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				// 	otherwise: (Schema) =>
				// 		Schema.nullable().transform((value, originalValue) =>
				// 			String(originalValue).trim() === '' ? null : value
				// 		),
				// }),
				pi_cash_quantity: NUMBER_OPTIONAL,
				remarks: STRING_NULLABLE,
				isDeletable: BOOLEAN_OPTIONAL,
			})
			.refine((data) => data.is_checked || data.pi_cash_quantity, {
				message: 'Quantity is required',
			})
	),

	new_pi_cash_entry: z
		.array(
			z
				.object({
					is_checked: BOOLEAN_OPTIONAL,
					sfg_uuid: STRING_NULLABLE,
					max_quantity: NUMBER_REQUIRED,
					pi_cash_quantity: NUMBER_OPTIONAL,
					remarks: STRING_NULLABLE,
					isDeletable: BOOLEAN_OPTIONAL,
				})
				.refine((data) => data.is_checked || data.pi_cash_quantity, {
					message: 'Quantity is required',
				})
		)
		.optional(),

	pi_cash_entry_thread: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				is_checked: BOOLEAN_OPTIONAL,
				sfg_uuid: STRING_NULLABLE,
				max_quantity: NUMBER_REQUIRED,
				pi_cash_quantity: NUMBER_OPTIONAL,
				remarks: STRING_NULLABLE,
				isDeletable: BOOLEAN_OPTIONAL,
			})
			.refine((data) => data.is_checked || data.pi_cash_quantity, {
				message: 'Quantity is required',
			})
	),

	new_pi_cash_entry_thread: z
		.array(
			z
				.object({
					is_checked: BOOLEAN_OPTIONAL,
					sfg_uuid: STRING_NULLABLE,
					max_quantity: NUMBER_REQUIRED,
					pi_cash_quantity: NUMBER_OPTIONAL,
					remarks: STRING_NULLABLE,
					isDeletable: BOOLEAN_OPTIONAL,
				})
				.refine((data) => data.is_checked || data.pi_cash_quantity, {
					message: 'Quantity is required',
				})
		)
		.optional(),
});

export const PI_NULL: Partial<IPi> = {
	marketing_uuid: '',
	party_uuid: '',
	order_info_uuids: null,
	merchandiser_uuid: '',
	factory_uuid: '',
	bank_uuid: '',
	remarks: '',
	pi_cash_entry: [],
};

export type IPi = z.infer<typeof PI_SCHEMA>;

// PI CASH
export const PI_CASH_SCHEMA = z.object({
	marketing_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	order_info_uuids: JSON_STRING_REQUIRED,
	thread_order_info_uuids: JSON_STRING.optional(),
	new_order_info_uuids: JSON_STRING.optional(),
	new_order_info_thread_uuids: JSON_STRING.optional(),
	merchandiser_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	conversion_rate: NUMBER_DOUBLE_REQUIRED,
	receive_amount: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,

	pi_cash_entry: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				is_checked: BOOLEAN_OPTIONAL,
				sfg_uuid: STRING_NULLABLE,
				max_quantity: NUMBER_REQUIRED,
				// pi_cash_quantity: yup.number().when('is_checked', {
				// 	is: true,
				// 	then: (Schema) =>
				// 		Schema.typeError('Must be a number')
				// 			.required('Quantity is required')
				// 			.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				// 	otherwise: (Schema) =>
				// 		Schema.nullable().transform((value, originalValue) =>
				// 			String(originalValue).trim() === '' ? null : value
				// 		),
				// }),
				pi_cash_quantity: NUMBER_OPTIONAL, // TODO: Fix this
				remarks: STRING_NULLABLE,
				isDeletable: BOOLEAN_OPTIONAL,
			})
			.refine((data) => data.is_checked || data.pi_cash_quantity, {
				message: 'Quantity is required',
			})
	),

	new_pi_cash_entry: z
		.array(
			z
				.object({
					is_checked: BOOLEAN_OPTIONAL,
					sfg_uuid: STRING_NULLABLE,
					max_quantity: NUMBER_REQUIRED,
					pi_cash_quantity: NUMBER_OPTIONAL, // TODO: Fix this
					remarks: STRING_NULLABLE,
					isDeletable: BOOLEAN_OPTIONAL,
				})
				.refine((data) => data.is_checked || data.pi_cash_quantity, {
					message: 'Quantity is required',
				})
		)
		.optional(),

	pi_cash_entry_thread: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				is_checked: BOOLEAN_OPTIONAL,
				sfg_uuid: STRING_NULLABLE,
				max_quantity: NUMBER_REQUIRED,
				pi_cash_quantity: NUMBER_OPTIONAL, // TODO: Fix this
				remarks: STRING_NULLABLE,
				isDeletable: BOOLEAN_OPTIONAL,
			})
			.refine((data) => data.is_checked || data.pi_cash_quantity, {
				message: 'Quantity is required',
			})
	),

	new_pi_cash_entry_thread: z
		.array(
			z
				.object({
					is_checked: BOOLEAN_OPTIONAL,
					sfg_uuid: STRING_NULLABLE,
					max_quantity: NUMBER_REQUIRED,
					pi_cash_quantity: NUMBER_OPTIONAL, // TODO: Fix this
					remarks: STRING_NULLABLE,
					isDeletable: BOOLEAN_OPTIONAL,
				})
				.refine((data) => data.is_checked || data.pi_cash_quantity, {
					message: 'Quantity is required',
				})
		)
		.optional(),
});

export const PI_CASH_NULL: Partial<IPiCash> = {
	marketing_uuid: '',
	party_uuid: '',
	order_info_uuids: [],
	thread_order_info_uuids: [],
	new_order_info_uuids: [],
	new_order_info_thread_uuids: [],
	merchandiser_uuid: '',
	factory_uuid: '',
	remarks: '',
	conversion_rate: 0,
	receive_amount: 0,
	pi_cash_entry: [],
	new_pi_cash_entry: [],
	pi_cash_entry_thread: [],
	new_pi_cash_entry_thread: [],
};

export type IPiCash = z.infer<typeof PI_CASH_SCHEMA>;

// Bank
export const BANK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	swift_code: STRING_REQUIRED,
	routing_no: STRING_NULLABLE,
	address: STRING_REQUIRED,
	policy: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BANK_NULL: Partial<IBank> = {
	name: '',
	swift_code: '',
	routing_no: null,
	address: '',
	policy: '',
	remarks: null,
};

export type IBank = z.infer<typeof BANK_SCHEMA>;
