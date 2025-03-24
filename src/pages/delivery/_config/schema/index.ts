import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Vehicle Schema
export const VEHICLE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	no: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VEHICLE_NULL: Partial<IVehicle> = {
	name: '',
	no: '',
	remarks: null,
};

export type IVehicle = z.infer<typeof VEHICLE_SCHEMA>;

//* Courier Schema
export const COURIER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	branch: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const COURIER_NULL: Partial<ICourier> = {
	name: '',
	branch: '',
	remarks: null,
};
export type ICourier = z.infer<typeof COURIER_SCHEMA>;

//*Challan Schema
export const CHALLAN_SCHEMA = z
	.object({
		customer_uuid: STRING_REQUIRED,
		challan_type: z.enum(['customer_pickup', 'employee_delivery', 'courier_delivery', 'vehicle_delivery']),
		employee_uuid: STRING_NULLABLE,
		vehicle_uuid: STRING_NULLABLE,
		courier_uuid: STRING_NULLABLE,
		is_delivery_complete: BOOLEAN_REQUIRED,
		remarks: STRING_NULLABLE,
		challan_entries: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				order_id: STRING_OPTIONAL,
				order_uuid: STRING_OPTIONAL,
				remarks: STRING_NULLABLE,
			})
		),
		new_challan_entries: z
			.array(
				z.object({
					order_id: STRING_OPTIONAL,
					order_uuid: STRING_REQUIRED,
					remarks: STRING_NULLABLE,
				})
			)
			.optional(),
	})
	.superRefine((data, ctx) => {
		if (
			!data.employee_uuid &&
			(data.challan_type === 'employee_delivery' || data.challan_type === 'vehicle_delivery')
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required',
				path: ['employee_uuid'],
			});
		}
		if (!data.vehicle_uuid && data.challan_type === 'vehicle_delivery') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required',
				path: ['vehicle_uuid'],
			});
		}
		if (!data.courier_uuid && data.challan_type === 'courier_delivery') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required',
				path: ['courier_uuid'],
			});
		}
	});
export const CHALLAN_NULL: Partial<IChallan> = {
	customer_uuid: '',
	challan_type: undefined,
	employee_uuid: null,
	vehicle_uuid: null,
	courier_uuid: null,
	is_delivery_complete: false,
	remarks: null,
	challan_entries: [],
	new_challan_entries: [],
};
export type IChallan = z.infer<typeof CHALLAN_SCHEMA>;
