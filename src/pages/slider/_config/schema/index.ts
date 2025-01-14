import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_NULLABLE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_NULLABLE,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Slider Assembly Schema
export const SLIDER_SLIDER_ASSEMBLY_SCHEMA = z.object({
	slider_slider_assembly_details: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			slider_slider_assembly_uuid: STRING_REQUIRED,
			order_number: STRING_REQUIRED,
			party: STRING_REQUIRED,
			slider_item_id: STRING_REQUIRED,
			production_quantity: NUMBER_DOUBLE_REQUIRED,
			production_weight: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const SLIDER_SLIDER_ASSEMBLY_NULL: Partial<ISliderSliderAssembly> = {
	slider_slider_assembly_details: [],
};

export type ISliderSliderAssembly = z.infer<typeof SLIDER_SLIDER_ASSEMBLY_SCHEMA>;

// Item Library Schema
export const ITEM_LIBRARY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const ITEM_LIBRARY_NULL: Partial<IItemLibrary> = {
	name: '',
	short_name: '',
	remarks: null,
};

export type IItemLibrary = z.infer<typeof ITEM_LIBRARY_SCHEMA>;

// Slider Item Transaction Schema
export const SLIDER_ITEM_TRANSACTION_SCHEMA = z.object({
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SLIDER_ITEM_TRANSACTION_NULL: Partial<ISliderItemTransaction> = {
	remarks: null,
};

export type ISliderItemTransaction = z.infer<typeof SLIDER_ITEM_TRANSACTION_SCHEMA>;

// Slider Assembly Stock Schema
export const SLIDER_ASSEMBLY_STOCK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	die_casting_body_uuid: STRING_REQUIRED,
	die_casting_puller_uuid: STRING_REQUIRED,
	die_casting_cap_uuid: STRING_REQUIRED,
	die_casting_link_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SLIDER_ASSEMBLY_STOCK_NULL: Partial<ISliderAssemblyStock> = {
	name: '',
	die_casting_body_uuid: '',
	die_casting_puller_uuid: '',
	die_casting_cap_uuid: '',
	die_casting_link_uuid: '',
	remarks: null,
};

export type ISliderAssemblyStock = z.infer<typeof SLIDER_ASSEMBLY_STOCK_SCHEMA>;

// Slider Assembly Production Entry Schema
export const SLIDER_ASSEMBLY_PRODUCTION_ENTRY_SCHEMA = z.object({
	with_link: BOOLEAN_REQUIRED.default(true),
	production_quantity: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED.gt(0, 'More than 0'),
	// wastage: NUMBER.nullable().transform((value, originalValue) =>
	// 	String(originalValue).trim() === '' ? 0 : value
	// ),
	wastage: NUMBER_NULLABLE, // TODO: Fix this
	remarks: STRING_NULLABLE,
});

export const SLIDER_ASSEMBLY_PRODUCTION_ENTRY_NULL: Partial<ISliderAssemblyProductionEntry> = {
	with_link: true,
	wastage: 0,
	remarks: null,
};

export type ISliderAssemblyProductionEntry = z.infer<typeof SLIDER_ASSEMBLY_PRODUCTION_ENTRY_SCHEMA>;

// Slider Assembly Transaction Schema
export const SLIDER_ASSEMBLY_TRANSACTION_SCHEMA = z.object({
	trx_quantity: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED.gt(0, 'More than 0'),
	remarks: STRING_NULLABLE,
});

export const SLIDER_ASSEMBLY_TRANSACTION_NULL: Partial<ISliderAssemblyTransaction> = {
	remarks: null,
};

export type ISliderAssemblyTransaction = z.infer<typeof SLIDER_ASSEMBLY_TRANSACTION_SCHEMA>;

// Slider Die Casting Transfer Against Stock Schema
export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_SCHEMA = z.object({
	section: STRING_REQUIRED,
	// order_description_uuid: STRING.when('section', {
	// 	is: (value) => value == 'coloring',
	// 	then: (schema) => schema.required('order is required'),
	// 	otherwise: (schema) => schema.nullable(),
	// }),
	order_description_uuid: STRING_NULLABLE, // TODO: Fix this
	stocks: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			is_checked: BOOLEAN_REQUIRED,
			// assigned_quantity: NUMBER.when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.required('Quantity is required').max(
			// 			yup.ref('quantity'),
			// 			'Beyond Max Quantity'
			// 		),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			assigned_quantity: NUMBER_NULLABLE, // TODO: Fix this
			// assigned_weight: NUMBER_DOUBLE.when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.required('Weight is required').max(
			// 			yup.ref('weight'),
			// 			'Beyond Max Weight'
			// 		),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			assigned_weight: NUMBER_DOUBLE_NULLABLE, // TODO: Fix this
			remarks: STRING_NULLABLE,
		})
	),
});

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_NULL: Partial<ISliderDieCastingTransferAgainstStock> = {
	order_description_uuid: null,
	section: '',
	stocks: [],
};

export type ISliderDieCastingTransferAgainstStock = z.infer<typeof SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_SCHEMA>;

// Slider Die Casting Transfer Against Stock Update Schema
export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_UPDATE = z.object({
	// quantity: NUMBER_REQUIRED.max(
	// 	yup.ref('max_quantity'),
	// 	'Beyond Max Quantity'
	// ),
	quantity: NUMBER_NULLABLE, // TODO: Fix this
	// weight: NUMBER_DOUBLE_REQUIRED.max(
	// 	yup.ref('max_weight'),
	// 	'Beyond Max Quantity'
	// ),
	weight: NUMBER_NULLABLE, // TODO: Fix this
	remarks: STRING_NULLABLE,
});

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_UPDATE_NULL: Partial<ISliderDieCastingTransferAgainstStockUpdate> =
	{
		quantity: null,
		weight: null,
		remarks: null,
	};

export type ISliderDieCastingTransferAgainstStockUpdate = z.infer<
	typeof SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_UPDATE
>;

// Slider Die Casting Transfer Against Order Schema
export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_UPDATE = z.object({
	// trx_quantity: NUMBER_REQUIRED.max(
	// 	yup.ref('max_quantity'),
	// 	'Beyond Max Quantity'
	// ),
	trx_quantity: NUMBER_NULLABLE, // TODO: Fix this
	// weight: NUMBER_DOUBLE_REQUIRED.max(
	// 	yup.ref('max_weight'),
	// 	'Beyond Max Quantity'
	// ),
	weight: NUMBER_NULLABLE, // TODO: Fix this
	remarks: STRING_NULLABLE,
});

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_UPDATE_NULL: Partial<ISliderDieCastingTransferAgainstOrderUpdate> =
	{
		trx_quantity: null,
		weight: null,
		remarks: null,
	};

export type ISliderDieCastingTransferAgainstOrderUpdate = z.infer<
	typeof SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_UPDATE
>;

// Slider Die Casting Stock Schema
export const SLIDER_DIE_CASTING_STOCK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	item: STRING_REQUIRED,
	zipper_number: STRING_REQUIRED,
	end_type: STRING_NULLABLE,
	puller_type: STRING_NULLABLE,
	logo_type: STRING_NULLABLE,
	slider_body_shape: STRING_NULLABLE,
	puller_link: STRING_NULLABLE,
	stopper_type: STRING_NULLABLE,
	type: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	is_body: BOOLEAN_REQUIRED,
	is_puller: BOOLEAN_REQUIRED,
	is_cap: BOOLEAN_REQUIRED,
	is_link: BOOLEAN_REQUIRED,
	is_h_bottom: BOOLEAN_REQUIRED,
	is_u_top: BOOLEAN_REQUIRED,
	is_box_pin: BOOLEAN_REQUIRED,
	is_two_way_pin: BOOLEAN_REQUIRED,
	// is_logo_body: BOOLEAN.default(false).when('logo_type', {
	// 	is: (value) => value != null && value !== '', // Check if logo_type has a value
	// 	then: (schema) =>
	// 		schema.test(
	// 			'is_logo_body_test',
	// 			'Either logo body or logo puller is required',
	// 			function (value) {
	// 				// Pass if either is_logo_body is true or is_logo_puller is true
	// 				return value || this.parent.is_logo_puller;
	// 			}
	// 		),
	// 	otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	// }),
	is_logo_body: BOOLEAN_REQUIRED.default(false), // TODO: Fix this
	// is_logo_puller: BOOLEAN.default(false).when('logo_type', {
	// 	is: (value) => value != null && value !== '', // Check if logo_type has a value
	// 	then: (schema) =>
	// 		schema.test(
	// 			'is_logo_puller_test',
	// 			'Either logo body or logo puller is required',
	// 			function (value) {
	// 				// Pass if either is_logo_puller is true or is_logo_body is true
	// 				return value || this.parent.is_logo_body;
	// 			}
	// 		),
	// 	otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	// }),
	is_logo_puller: BOOLEAN_REQUIRED.default(false), // TODO: Fix this
});

export const SLIDER_DIE_CASTING_STOCK_NULL: Partial<ISliderDieCastingStock> = {
	name: '',
	item: '',
	zipper_number: '',
	end_type: null,
	puller_type: null,
	logo_type: null,
	slider_body_shape: null,
	puller_link: null,
	stopper_type: null,
	remarks: null,
	is_body: false,
	is_puller: false,
	is_cap: false,
	is_link: false,
	is_h_bottom: false,
	is_u_top: false,
	is_box_pin: false,
	is_two_way_pin: false,
	is_logo_body: false,
	is_logo_puller: false,
};

export type ISliderDieCastingStock = z.infer<typeof SLIDER_DIE_CASTING_STOCK_SCHEMA>;

// Slider Die Casting Product Edit Schema
export const SLIDER_DIE_CASTING_PRODUCT_EDIT_SCHEMA = z.object({
	mc_no: NUMBER_REQUIRED,
	cavity_goods: NUMBER_REQUIRED,
	cavity_defect: NUMBER_REQUIRED,
	push: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SLIDER_DIE_CASTING_PRODUCT_EDIT_NULL: Partial<ISliderDieCastingProductEdit> = {
	remarks: null,
};

export type ISliderDieCastingProductEdit = z.infer<typeof SLIDER_DIE_CASTING_PRODUCT_EDIT_SCHEMA>;

// Slider Die Casting Schema
export const SLIDER_DIE_CASTING_SCHEMA = z.object({
	array: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			mc_no: NUMBER_REQUIRED,
			die_casting_uuid: STRING_REQUIRED,
			order_info_uuid: STRING_NULLABLE,
			cavity_goods: NUMBER_REQUIRED,
			cavity_defect: NUMBER_REQUIRED,
			push: NUMBER_REQUIRED,
			weight: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const SLIDER_DIE_CASTING_NULL: Partial<ISliderDieCasting> = {
	array: [],
};

export type ISliderDieCasting = z.infer<typeof SLIDER_DIE_CASTING_SCHEMA>;

// Slider Dashboard Info Schema
export const SLIDER_DASHBOARD_INFO_SCHEMA = z.object({
	order_info_uuid: STRING_REQUIRED,
	item: STRING_REQUIRED,
	zipper_number: STRING_REQUIRED,
	end_type: STRING_REQUIRED,
	puller_type: STRING_REQUIRED,
	color: STRING_REQUIRED,
	order_quantity: NUMBER_REQUIRED,
	body_quantity: NUMBER_REQUIRED,
	cap_quantity: NUMBER_REQUIRED,
	puller_quantity: NUMBER_REQUIRED,
	link_quantity: NUMBER_REQUIRED,
	sa_prod: NUMBER_REQUIRED,
	coloring_stock: NUMBER_REQUIRED,
	coloring_prod: NUMBER_REQUIRED,
	trx_to_finishing: NUMBER_REQUIRED,
	u_top_quantity: NUMBER_REQUIRED,
	h_bottom_quantity: NUMBER_REQUIRED,
	box_pin_quantity: NUMBER_REQUIRED,
	two_way_pin_quantity: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SLIDER_DASHBOARD_INFO_NULL: Partial<ISliderDashboardInfo> = {
	order_info_uuid: '',
	item: '',
	zipper_number: '',
	end_type: '',
	puller_type: '',
	color: '',
	remarks: null,
};

export type ISliderDashboardInfo = z.infer<typeof SLIDER_DASHBOARD_INFO_SCHEMA>;
