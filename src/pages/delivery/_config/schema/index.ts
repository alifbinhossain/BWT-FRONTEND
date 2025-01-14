import { z } from 'zod';

import {
	BOOLEAN_DEFAULT_VALUE,
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	JSON_STRING_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_OPTIONAL,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Challan Schema
export const CHALLAN_SCHEMA = z.object({
	assign_to: STRING_REQUIRED,
	order_info_uuid: STRING_REQUIRED,
	packing_list_uuids: JSON_STRING_REQUIRED,
	new_packing_list_uuids: JSON_STRING_REQUIRED,
	receive_status: BOOLEAN_DEFAULT_VALUE(false),
	gate_pass: BOOLEAN_DEFAULT_VALUE(false),
	challan_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			packing_list_uuid: STRING_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),

	new_challan_entry: z
		.array(
			z.object({
				packing_list_uuid: STRING_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		)
		.optional(),
});

export const CHALLAN_NULL: Partial<IChallan> = {
	assign_to: '',
	order_info_uuid: '',
	packing_list_uuids: [],
	new_packing_list_uuids: [],
	receive_status: false,
	gate_pass: false,
	challan_entry: [
		{
			packing_list_uuid: '',
			remarks: '',
		},
	],

	new_challan_entry: [],
};

export type IChallan = z.infer<typeof CHALLAN_SCHEMA>;

// Packing List Schema
export const PACKING_LIST_SCHEMA = z.object({
	order_info_uuid: STRING_REQUIRED,
	carton_size: STRING_REQUIRED,
	carton_weight: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
	packing_list_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			is_checked: BOOLEAN_REQUIRED,
			sfg_uuid: STRING_REQUIRED,
			packing_list_uuid: STRING_NULLABLE,
			order_number: STRING_REQUIRED,
			item_description: STRING_REQUIRED,
			style_color_size: STRING_REQUIRED,
			order_quantity: NUMBER_DOUBLE_REQUIRED,
			warehouse: NUMBER_DOUBLE_REQUIRED,
			delivered: NUMBER_DOUBLE_REQUIRED,
			balance_quantity: NUMBER_DOUBLE_REQUIRED,
			// short_quantity: yup.number().when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.typeError('Must be a number').max(
			// 			yup.ref('order_quantity'),
			// 			'Beyond Order Quantity'
			// 		),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			short_quantity: NUMBER_OPTIONAL, // TODO: Fix this
			// reject_quantity: yup.number().when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.typeError('Must be a number').max(
			// 			yup.ref('order_quantity'),
			// 			'Beyond Order Quantity'
			// 		),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			reject_quantity: NUMBER_OPTIONAL, // TODO: Fix this
			// quantity: yup.number().when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.typeError('Must be a number')
			// 			.required('Quantity is required')
			// 			.max(
			// 				yup.ref('balance_quantity'),
			// 				'Beyond Balance Quantity'
			// 			),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			quantity: NUMBER_OPTIONAL, // TODO: Fix this
			remarks: STRING_NULLABLE,
			isDeletable: BOOLEAN_OPTIONAL,
		})
	),
});

export const PACKING_LIST_NULL: Partial<IPackingList> = {
	order_info_uuid: '',
	carton_size: '',
	remarks: '',
	packing_list_entry: [],
};

export type IPackingList = z.infer<typeof PACKING_LIST_SCHEMA>;
