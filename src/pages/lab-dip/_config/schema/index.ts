import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Lab Info Schema
export const LAB_INFO_SCHEMA = z.object({
	order_info_uuid: STRING_NULLABLE,
	name: STRING_REQUIRED,
	lab_status: BOOLEAN_REQUIRED.default(false),
	remarks: STRING_NULLABLE,
	recipe: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			status: BOOLEAN_REQUIRED.default(false),
			approved: BOOLEAN_REQUIRED.default(false),
			recipe_uuid: STRING_REQUIRED,
		})
	),
});

export const LAB_INFO_NULL: Partial<ILabInfo> = {
	order_info_uuid: null,
	name: '',
	remarks: '',
	recipe: [
		{
			status: false,
			approved: false,
			recipe_uuid: '',
		},
	],
};

export type ILabInfo = z.infer<typeof LAB_INFO_SCHEMA>;

// Lab Recipe Schema
export const LAB_RECIPE_SCHEMA = z.object({
	lab_dip_info_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	bleaching: STRING_REQUIRED,
	sub_streat: STRING_NULLABLE,
	approved: BOOLEAN_REQUIRED.default(false),
	status: BOOLEAN_REQUIRED.default(false),
	remarks: STRING_NULLABLE,
	recipe_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const LAB_RECIPE_NULL: Partial<ILabRecipe> = {
	name: '',
	bleaching: 'non-bleach',
	sub_streat: '',
	remarks: '',
	recipe_entry: [],
};

export type ILabRecipe = z.infer<typeof LAB_RECIPE_SCHEMA>;

// Lab Shade Recipe Schema
export const SHADE_RECIPE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	sub_streat: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	lab_status: BOOLEAN_REQUIRED.default(false),
	bleaching: STRING_REQUIRED.default('non-bleach'),
	shade_recipe_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED.gt(0, 'Quantity must be greater than 0'),
			remarks: STRING_NULLABLE,
		})
	),
});

export const SHADE_RECIPE_NULL: Partial<ILabShadeRecipe> = {
	name: '',
	sub_streat: '',
	bleaching: 'non-bleach',
	remarks: '',
	shade_recipe_entry: [],
};

export type ILabShadeRecipe = z.infer<typeof SHADE_RECIPE_SCHEMA>;

// Swatch Schema
export const SWATCH_SCHEMA = z.object({
	remarks: STRING_NULLABLE,
});

export const SWATCH_NULL: Partial<ISwatch> = {
	remarks: '',
};

export type ISwatch = z.infer<typeof SWATCH_SCHEMA>;
