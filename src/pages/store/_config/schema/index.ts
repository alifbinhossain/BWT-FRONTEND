import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	department: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	department: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Group Schema
export const GROUP_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const GROUP_NULL: Partial<IGroup> = {
	name: '',
	remarks: null,
};

export type IGroup = z.infer<typeof GROUP_SCHEMA>;

//* Category Schema
export const CATEGORY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	group_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const CATEGORY_NULL: Partial<ICategory> = {
	name: '',
	group_uuid: '',
	remarks: null,
};

export type ICategory = z.infer<typeof CATEGORY_SCHEMA>;

//* Brand Schema
export const BRAND_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BRAND_NULL: Partial<IBrand> = {
	name: '',
	remarks: null,
};

export type IBrand = z.infer<typeof BRAND_SCHEMA>;

//* Model Schema
export const MODEL_SCHEMA = z.object({
	name: STRING_REQUIRED,
	brand_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const MODEL_NULL: Partial<IModel> = {
	name: '',
	brand_uuid: '',
	remarks: null,
};

export type IModel = z.infer<typeof MODEL_SCHEMA>;

//* Size Schema
export const SIZE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SIZE_NULL: Partial<ISize> = {
	name: '',
	remarks: null,
};

export type ISize = z.infer<typeof SIZE_SCHEMA>;

//* Vendor Schema
export const VENDOR_SCHEMA = z.object({
	model_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	company_name: STRING_REQUIRED,
	phone: PHONE_NUMBER_REQUIRED,
	address: STRING_REQUIRED,
	description: STRING_NULLABLE,
	is_active: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	model_uuid: '',
	name: '',
	company_name: '',
	phone: '',
	address: '',
	description: null,
	is_active: false,
	remarks: '',
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;

//* Product Schema
export const PRODUCT_SCHEMA = z.object({
	category_uuid: STRING_REQUIRED,
	model_uuid: STRING_REQUIRED,
	size_uuid: STRING_NULLABLE,
	name: STRING_REQUIRED,
	warranty_days: NUMBER_DOUBLE_REQUIRED,
	type: z.enum(['service', 'inventory']),
	service_warranty_days: NUMBER_DOUBLE_REQUIRED,
	is_maintaining_stock: BOOLEAN_REQUIRED,
	warehouse_1: NUMBER_DOUBLE_REQUIRED,
	warehouse_2: NUMBER_DOUBLE_REQUIRED,
	warehouse_3: NUMBER_DOUBLE_REQUIRED,
	warehouse_4: NUMBER_DOUBLE_REQUIRED,
	warehouse_5: NUMBER_DOUBLE_REQUIRED,
	warehouse_6: NUMBER_DOUBLE_REQUIRED,
	warehouse_7: NUMBER_DOUBLE_REQUIRED,
	warehouse_8: NUMBER_DOUBLE_REQUIRED,
	warehouse_9: NUMBER_DOUBLE_REQUIRED,
	warehouse_10: NUMBER_DOUBLE_REQUIRED,
	warehouse_11: NUMBER_DOUBLE_REQUIRED,
	warehouse_12: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PRODUCT_NULL: Partial<IProduct> = {
	category_uuid: '',
	model_uuid: '',
	size_uuid: null,
	name: '',
	warranty_days: 0,
	service_warranty_days: 0,
	type: 'service',
	is_maintaining_stock: false,
	warehouse_1: 0,
	warehouse_2: 0,
	warehouse_3: 0,
	warehouse_4: 0,
	warehouse_5: 0,
	warehouse_6: 0,
	warehouse_7: 0,
	warehouse_8: 0,
	warehouse_9: 0,
	warehouse_10: 0,
	warehouse_11: 0,
	warehouse_12: 0,
	remarks: '',
};

export type IProduct = z.infer<typeof PRODUCT_SCHEMA>;

//* Stock Schema
export const STOCK_SCHEMA = z.object({
	product_entry_uuid: STRING_REQUIRED,
	warehouse_1: NUMBER_DOUBLE_REQUIRED,
	warehouse_2: NUMBER_DOUBLE_REQUIRED,
	warehouse_3: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const STOCK_NULL: Partial<IStock> = {
	product_entry_uuid: '',
	warehouse_1: 0,
	warehouse_2: 0,
	warehouse_3: 0,
	remarks: null,
};

export type IStock = z.infer<typeof STOCK_SCHEMA>;

//* Internal Transfer Schema
export const INTERNAL_TRANSFER_SCHEMA = z.object({
	from_warehouse_uuid: STRING_REQUIRED,
	to_warehouse_uuid: STRING_REQUIRED,
	rack_uuid: STRING_NULLABLE,
	floor_uuid: STRING_NULLABLE,
	box_uuid: STRING_NULLABLE,
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
	serials: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			purchase_entry_uuid: STRING_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const INTERNAL_TRANSFER_NULL: Partial<IInternalTransfer> = {
	from_warehouse_uuid: '',
	to_warehouse_uuid: '',
	rack_uuid: null,
	floor_uuid: null,
	box_uuid: null,
	quantity: 0,
	serials: [],
	remarks: null,
};

export type IInternalTransfer = z.infer<typeof INTERNAL_TRANSFER_SCHEMA>;
//* Internal Transfer Schema
export const INTERNAL_TRANSFER_LOG_SCHEMA = z.object({
	from_warehouse_uuid: STRING_REQUIRED,
	to_warehouse_uuid: STRING_REQUIRED,
	rack_uuid: STRING_NULLABLE,
	floor_uuid: STRING_NULLABLE,
	box_uuid: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
	purchase_entry_uuid: STRING_REQUIRED,
});

export const INTERNAL_TRANSFER_LOG_NULL: Partial<IInternalTransferLog> = {
	from_warehouse_uuid: '',
	to_warehouse_uuid: '',
	rack_uuid: null,
	floor_uuid: null,
	box_uuid: null,
	remarks: null,
	purchase_entry_uuid: '',
};

export type IInternalTransferLog = z.infer<typeof INTERNAL_TRANSFER_LOG_SCHEMA>;

//* Branch Schema
export const BRANCH_SCHEMA = z.object({
	name: STRING_REQUIRED,
	address: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BRANCH_NULL: Partial<IBranch> = {
	name: '',
	address: '',
	remarks: null,
};

export type IBranch = z.infer<typeof BRANCH_SCHEMA>;

//* Warehouse Schema
export const WAREHOUSE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	assigned: z.enum([
		'warehouse_1',
		'warehouse_2',
		'warehouse_3',
		'warehouse_4',
		'warehouse_5',
		'warehouse_6',
		'warehouse_7',
		'warehouse_8',
		'warehouse_9',
		'warehouse_10',
		'warehouse_11',
		'warehouse_12',
	]),
	branch_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const WAREHOUSE_NULL: Partial<IWarehouse> = {
	name: '',
	assigned: 'warehouse_1',
	branch_uuid: '',
	remarks: null,
};

export type IWarehouse = z.infer<typeof WAREHOUSE_SCHEMA>;

//* Room Schema
export const ROOM_SCHEMA = z.object({
	name: STRING_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const ROOM_NULL: Partial<IRoom> = {
	name: '',
	warehouse_uuid: '',
	remarks: null,
};

export type IRoom = z.infer<typeof ROOM_SCHEMA>;

//* Rack Schema
export const RACK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const RACK_NULL: Partial<IRack> = {
	name: '',
	warehouse_uuid: '',
	remarks: null,
};

export type IRack = z.infer<typeof RACK_SCHEMA>;

//* Floor Schema
export const FLOOR_SCHEMA = z.object({
	name: STRING_REQUIRED,
	rack_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const FLOOR_NULL: Partial<IFloor> = {
	name: '',
	rack_uuid: '',
	remarks: null,
};

export type IFloor = z.infer<typeof FLOOR_SCHEMA>;

//* Box Schema
export const BOX_SCHEMA = z.object({
	name: STRING_REQUIRED,
	floor_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BOX_NULL: Partial<IBox> = {
	name: '',
	floor_uuid: '',
	remarks: null,
};

export type IBox = z.infer<typeof BOX_SCHEMA>;

//* Purchase Schema
export const PURCHASE_SCHEMA = z.object({
	vendor_uuid: STRING_REQUIRED,
	branch_uuid: STRING_REQUIRED,
	date: STRING_REQUIRED,
	payment_mode: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	purchase_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			purchase_uuid: STRING_OPTIONAL,
			product_uuid: STRING_REQUIRED,
			product_name: STRING_OPTIONAL,
			serial_no: STRING_REQUIRED,

			price_per_unit: NUMBER_DOUBLE_REQUIRED,
			discount: NUMBER_DOUBLE_REQUIRED.default(0),
			remarks: STRING_NULLABLE,
			warehouse_uuid: STRING_REQUIRED,
			box_uuid: STRING_NULLABLE,
			rack_uuid: STRING_NULLABLE,
			floor_uuid: STRING_NULLABLE,
		})
	),
});

export const PURCHASE_NULL: Partial<IPurchase> = {
	vendor_uuid: '',
	branch_uuid: '',
	date: '',
	payment_mode: '',
	remarks: '',
	purchase_entry: [
		{
			uuid: '',
			purchase_uuid: '',
			product_uuid: '',
			serial_no: '',
			price_per_unit: 0,
			discount: 0,
			remarks: '',
			warehouse_uuid: '',
			box_uuid: null,
			rack_uuid: null,
			floor_uuid: null,
		},
	],
};

export type IPurchase = z.infer<typeof PURCHASE_SCHEMA>;

//* Purchase Return Schema
export const PURCHASE_RETURN_SCHEMA = z.object({
	purchase_uuid: STRING_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	purchase_return_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			purchase_return_uuid: STRING_OPTIONAL,
			purchase_entry_uuid: STRING_REQUIRED,
			product_name: STRING_OPTIONAL,
			remarks: STRING_NULLABLE,
		})
	),
});

export const PURCHASE_RETURN_NULL: Partial<IPurchaseReturn> = {
	purchase_uuid: '',
	warehouse_uuid: '',
	remarks: '',
	purchase_return_entry: [
		{
			uuid: '',
			purchase_return_uuid: '',
			purchase_entry_uuid: '',
			product_name: '',
			remarks: '',
		},
	],
};

export type IPurchaseReturn = z.infer<typeof PURCHASE_RETURN_SCHEMA>;

//* Purchase Log
export const PURCHASE_LOG_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	product_uuid: STRING_OPTIONAL,
	purchase_uuid: STRING_OPTIONAL,
	product_entry_uuid: STRING_REQUIRED,
	serial_no: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	price_per_unit: NUMBER_DOUBLE_REQUIRED,
	discount: NUMBER_DOUBLE_REQUIRED.default(0),
	remarks: STRING_NULLABLE,
	warehouse_uuid: STRING_REQUIRED,
	box_uuid: STRING_REQUIRED,
	rack_uuid: STRING_REQUIRED,
	floor_uuid: STRING_REQUIRED,
});

export const PURCHASE_LOG_NULL: Partial<IPurchaseLog> = {
	uuid: '',
	purchase_uuid: '',
	product_entry_uuid: '',
	serial_no: '',
	quantity: 0,
	price_per_unit: 0,
	discount: 0,
	remarks: '',
	warehouse_uuid: '',
	box_uuid: '',
	rack_uuid: '',
	floor_uuid: '',
};

export type IPurchaseLog = z.infer<typeof PURCHASE_LOG_SCHEMA>;

//* Purchase Return Log
export const PURCHASE_RETURN_LOG_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	purchase_return_uuid: STRING_OPTIONAL,
	product_entry_uuid: STRING_REQUIRED,
	product_name: STRING_OPTIONAL,
	quantity: NUMBER_DOUBLE_REQUIRED,
	price_per_unit: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PURCHASE_RETURN_LOG_NULL: Partial<IPurchaseReturnLog> = {
	uuid: '',
	purchase_return_uuid: '',
	product_entry_uuid: '',
	product_name: '',
	quantity: 0,
	price_per_unit: 0,
	remarks: '',
};

export type IPurchaseReturnLog = z.infer<typeof PURCHASE_RETURN_LOG_SCHEMA>;
//* Transfer Schema
export const TRANSFER_SCHEMA = z.object({
	order_uuid: STRING_REQUIRED,
	serials: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			purchase_entry_uuid: STRING_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
	remarks: STRING_NULLABLE,
});

export const TRANSFER_NULL: Partial<ITransfer> = {
	order_uuid: '',
	serials: [
		{
			purchase_entry_uuid: '',
			remarks: '',
		},
	],
	remarks: null,
};

export type ITransfer = z.infer<typeof TRANSFER_SCHEMA>;

export const TRANSFER_LOG_SCHEMA = z.object({
	order_uuid: STRING_REQUIRED,
	purchase_entry_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TRANSFER_LOG_NULL: Partial<ITransferLog> = {
	order_uuid: '',
	purchase_entry_uuid: '',
	remarks: null,
};

export type ITransferLog = z.infer<typeof TRANSFER_LOG_SCHEMA>;
