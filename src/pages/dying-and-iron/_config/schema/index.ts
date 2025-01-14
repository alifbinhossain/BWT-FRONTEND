import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NAME_REQUIRED,
	NUMBER_DOUBLE_NULLABLE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_NULLABLE,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Dyeing Batch Production Schema
export const DYEING_BATCH_PRODUCTION_SCHEMA = z.object({
	batch_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			// production_quantity: NUMBER.nullable() // Allows the field to be null
			// 	.transform((value, originalValue) =>
			// 		String(originalValue).trim() === '' ? null : value
			// 	)
			// 	.max(yup.ref('quantity'), 'Beyond Batch Quantity'), // Transforms empty strings to null
			production_quantity: NUMBER_NULLABLE, // TODO: Fix this
			// production_quantity_in_kg: NUMBER_DOUBLE.nullable()
			// 	.transform((value, originalValue) =>
			// 		String(originalValue).trim() === '' ? null : value
			// 	)
			// 	.max(yup.ref('quantity'), 'Beyond Batch Quantity'),
			production_quantity_in_kg: NUMBER_DOUBLE_NULLABLE, // TODO: Fix this
			batch_production_remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_BATCH_PRODUCTION_NULL: Partial<IDyeingBatchProduction> = {
	batch_entry: [],
};

export type IDyeingBatchProduction = z.infer<typeof DYEING_BATCH_PRODUCTION_SCHEMA>;

// Dyeing Batch Schema
export const DYEING_BATCH_SCHEMA = z.object({
	machine_uuid: STRING_REQUIRED,
	slot: NUMBER_REQUIRED.default(0),
	remarks: STRING_NULLABLE,
	batch_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			is_checked: BOOLEAN_REQUIRED.default(false),
			// quantity: yup.number().when('is_checked', {
			// 	is: true,
			// 	then: (Schema) =>
			// 		Schema.typeError('Must be a number')
			// 			.required('Quantity is required')
			// 			.max(
			// 				yup.ref('order_quantity'),
			// 				'Beyond Order Quantity'
			// 			),
			// 	otherwise: (Schema) =>
			// 		Schema.nullable().transform((value, originalValue) =>
			// 			String(originalValue).trim() === '' ? null : value
			// 		),
			// }),
			quantity: NUMBER_REQUIRED, // TODO: Fix this
			batch_remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_BATCH_NULL: Partial<IDyeingBatch> = {
	slot: 0,
	remarks: null,
	batch_entry: [],
};

export type IDyeingBatch = z.infer<typeof DYEING_BATCH_SCHEMA>;

// Dyeing Thread Conneing Schema
export const DYEING_THREAD_CONNEING_SCHEMA = z.object({
	uuid: STRING_REQUIRED,
	yarn_quantity: NUMBER_REQUIRED.gt(0, 'More than 0'),
	machine_uuid: STRING_REQUIRED,
	dyeing_operator: STRING_NULLABLE,
	reason: STRING_NULLABLE,
	category: STRING_NULLABLE,
	status: STRING_NULLABLE,
	pass_by: STRING_NULLABLE,
	shift: STRING_NULLABLE,
	dyeing_supervisor: STRING_NULLABLE,
	remarks: STRING_NULLABLE,

	batch_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			coning_production_quantity: NUMBER_REQUIRED,
			coning_production_quantity_in_kg: NUMBER_REQUIRED,
			transfer_quantity: NUMBER_REQUIRED,
		})
	),
});

export const DYEING_THREAD_CONNEING_NULL = {
	uuid: '',
	machine_uuid: '',
	batch_entry: [
		{
			coning_production_quantity: null,
			coning_production_quantity_in_kg: null,
			transfer_quantity: null,
		},
	],
};

export type IDyeingThreadConneing = z.infer<typeof DYEING_THREAD_CONNEING_SCHEMA>;

// Dyeing Thread Batch Entry Transfer Schema
export const DYEING_THREAD_BATCH_ENTRY_TRANSFER_SCHEMA = z.object({
	transfer_quantity: NUMBER_REQUIRED.gt(0),
});
export const DYEING_THREAD_BATCH_ENTRY_TRANSFER_NULL: Partial<IDyeingThreadBatchEntryTransfer> = {};

export type IDyeingThreadBatchEntryTransfer = z.infer<typeof DYEING_THREAD_BATCH_ENTRY_TRANSFER_SCHEMA>;

// Dyeing Thread Batch Schema
export const DYEING_THREAD_BATCH_SCHEMA = z.object({
	machine_uuid: STRING_REQUIRED,
	slot: NUMBER_REQUIRED.default(0),
	remarks: STRING_NULLABLE,
	batch_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			batch_remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_THREAD_BATCH_NULL: Partial<IDyeingThreadBatch> = {
	slot: 0,
	remarks: null,
	batch_entry: [],
};

export type IDyeingThreadBatch = z.infer<typeof DYEING_THREAD_BATCH_SCHEMA>;

// Dyeing Thread Batch Dyeing Schema
export const DYEING_THREAD_BATCH_DYEING_SCHEMA = z.object({
	yarn_quantity: NUMBER_REQUIRED,
	dyeing_operator: STRING_REQUIRED,
	reason: STRING_REQUIRED,
	category: STRING_REQUIRED,
	status: STRING_REQUIRED,
	pass_by: STRING_REQUIRED,
	shift: STRING_REQUIRED,
	dyeing_supervisor: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DYEING_THREAD_BATCH_DYEING_NULL: Partial<IDyeingThreadBatchDyeing> = {
	dyeing_operator: '',
	reason: '',
	category: '',
	status: '',
	pass_by: '',
	shift: '',
	dyeing_supervisor: '',
	remarks: '',
};

export type IDyeingThreadBatchDyeing = z.infer<typeof DYEING_THREAD_BATCH_DYEING_SCHEMA>;

// Dyeing Thread Batch Yarn Schema
export const DYEING_THREAD_BATCH_YARN_SCHEMA = z.object({
	yarn_quantity: NUMBER_REQUIRED.gt(0, 'More than 0'),
});
export const DYEING_THREAD_BATCH_YARN_NULL: Partial<IDyeingThreadBatchYarn> = {};

export type IDyeingThreadBatchYarn = z.infer<typeof DYEING_THREAD_BATCH_YARN_SCHEMA>;

// Thread Programs Schema
export const THREAD_PROGRAMS_SCHEMA = z.object({
	dyes_category_uuid: STRING_REQUIRED,
	material_uuid: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const THREAD_PROGRAMS_NULL: Partial<IThreadPrograms> = {
	remarks: null,
};

export type IThreadPrograms = z.infer<typeof THREAD_PROGRAMS_SCHEMA>;

// Dyeing Planning SNO Schema
export const DYEING_PLANNING_SNO_SCHEMA = z.object({
	remarks: STRING_NULLABLE,
	planning_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			// sno_quantity: NUMBER_NULLABLE.transform((value, originalValue) =>  // Allows the field to be null
			// 	String(originalValue).trim() === '' ? null : value
			// ) // Transforms empty strings to null
			// 	.max(yup.ref('max_sno_quantity'), ({ max }) => {
			// 		return `Beyond Max Quantity of ${Math.floor(max)}`;
			// 	}),
			sno_quantity: NUMBER_NULLABLE, // TODO: Fix this
			sno_remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_PLANNING_SNO_NULL: Partial<IDyeingPlanningSno> = {
	remarks: null,
	planning_entry: [],
};

export type IDyeingPlanningSno = z.infer<typeof DYEING_PLANNING_SNO_SCHEMA>;

// Dyeing Planning Head Office Schema
export const DYEING_PLANNING_HEADOFFICE_SCHEMA = z.object({
	remarks: STRING_NULLABLE,
	planning_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			// factory_quantity: NUMBER_NULLABLE // Allows the field to be null
			// 	.transform((value, originalValue) =>
			// 		String(originalValue).trim() === '' ? null : value
			// 	) // Transforms empty strings to null
			// 	.max(yup.ref('max_factory_quantity'), ({ max }) => {
			// 		return `Beyond Max Quantity of ${Math.floor(max)}`;
			// 	}),
			factory_quantity: NUMBER_NULLABLE, // TODO: Fix this
			factory_remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_PLANNING_HEADOFFICE_NULL: Partial<IDyeingPlanningHeadoffice> = {
	remarks: null,
	planning_entry: [],
};

export type IDyeingPlanningHeadoffice = z.infer<typeof DYEING_PLANNING_HEADOFFICE_SCHEMA>;

// Thread Machine Schema
export const THREAD_MACHINE_SCHEMA = z.object({
	name: NAME_REQUIRED,
	// max_capacity: NUMBER_REQUIRED.min(
	// 	yup.ref('min_capacity'),
	// 	'Less than Min Capacity'
	// ),
	max_capacity: NUMBER_OPTIONAL, // TODO: Fix this
	// min_capacity: NUMBER_REQUIRED.max(
	// 	yup.ref('max_capacity'),
	// 	'Beyond Max Capacity'
	// ),
	min_capacity: NUMBER_OPTIONAL, // TODO: Fix this
	is_nylon: BOOLEAN_REQUIRED.default(false),
	is_metal: BOOLEAN_REQUIRED.default(false),
	is_vislon: BOOLEAN_REQUIRED.default(false),
	is_sewing_thread: BOOLEAN_REQUIRED.default(false),
	is_bulk: BOOLEAN_REQUIRED.default(false),
	is_sample: BOOLEAN_REQUIRED.default(false),
	water_capacity: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const THREAD_MACHINE_NULL: Partial<IThreadMachine> = {
	name: '',
	is_nylon: false,
	is_metal: false,
	is_vislon: false,
	is_sewing_thread: false,
	is_bulk: false,
	is_sample: false,
	remarks: null,
};

export type IThreadMachine = z.infer<typeof THREAD_MACHINE_SCHEMA>;

// Thread Dyes Category Schema
export const THREAD_DYES_CATEGORY_SCHEMA = z.object({
	name: NAME_REQUIRED,
	id: NUMBER_REQUIRED,
	bleaching: STRING_REQUIRED,
	upto_percentage: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const THREAD_DYES_CATEGORY_NULL: Partial<IThreadDyesCategory> = {
	name: '',
	bleaching: '',
	remarks: null,
};

export type IThreadDyesCategory = z.infer<typeof THREAD_DYES_CATEGORY_SCHEMA>;
