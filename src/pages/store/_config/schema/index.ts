import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
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
	phone: STRING_REQUIRED,
	address: STRING_REQUIRED,
	description: STRING_REQUIRED,
	is_active: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	model_uuid: '',
	name: '',
	company_name: '',
	phone: '',
	address: '',
	description: '',
	is_active: false,
	remarks: '',
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;

//* Product Schema
export const PRODUCT_SCHEMA = z.object({
	category_uuid: STRING_REQUIRED,
	model_uuid: STRING_REQUIRED,
	size_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	warranty_days: NUMBER_DOUBLE_REQUIRED,
	type: z.enum(['service', 'inventory']),
	service_warranty_days: NUMBER_DOUBLE_REQUIRED,
	is_maintaining_stock: BOOLEAN_REQUIRED,
	warehouse_1: NUMBER_DOUBLE_REQUIRED,
	warehouse_2: NUMBER_DOUBLE_REQUIRED,
	warehouse_3: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PRODUCT_NULL: Partial<IProduct> = {
	category_uuid: '',
	model_uuid: '',
	size_uuid: '',
	name: '',
	warranty_days: 0,
	service_warranty_days: 0,
	type: 'service',
	is_maintaining_stock: false,
	warehouse_1: 0,
	warehouse_2: 0,
	warehouse_3: 0,
	remarks: '',
};

export type IProduct = z.infer<typeof PRODUCT_SCHEMA>;

//* Stock Schema
export const STOCK_SCHEMA = z.object({
	product_uuid: STRING_REQUIRED,
	warehouse_1: NUMBER_DOUBLE_REQUIRED,
	warehouse_2: NUMBER_DOUBLE_REQUIRED,
	warehouse_3: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const STOCK_NULL: Partial<IStock> = {
	product_uuid: '',
	warehouse_1: 0,
	warehouse_2: 0,
	warehouse_3: 0,
	remarks: null,
};

export type IStock = z.infer<typeof STOCK_SCHEMA>;

//* Internal Transfer Schema
export const INTERNAL_TRANSFER_SCHEMA = z.object({
	stock_uuid: STRING_OPTIONAL,
	from_branch_uuid: STRING_REQUIRED,
	to_branch_uuid: STRING_REQUIRED,
	warehouse_uuid: STRING_REQUIRED,
	rack_uuid: STRING_REQUIRED,
	floor_uuid: STRING_REQUIRED,
	box_uuid: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const INTERNAL_TRANSFER_NULL: Partial<IInternalTransfer> = {
	stock_uuid: '',
	from_branch_uuid: '',
	to_branch_uuid: '',
	warehouse_uuid: '',

	rack_uuid: '',
	floor_uuid: '',
	box_uuid: '',
	quantity: 0,
	remarks: null,
};

export type IInternalTransfer = z.infer<typeof INTERNAL_TRANSFER_SCHEMA>;

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
	branch_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const WAREHOUSE_NULL: Partial<IWarehouse> = {
	name: '',
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
			quantity: NUMBER_DOUBLE_REQUIRED,
			price_per_unit: NUMBER_DOUBLE_REQUIRED,
			discount: NUMBER_DOUBLE_REQUIRED.default(0),
			remarks: STRING_NULLABLE,
			warehouse_uuid: STRING_REQUIRED,
			box_uuid: STRING_OPTIONAL,
			rack_uuid: STRING_OPTIONAL,
			floor_uuid: STRING_OPTIONAL,
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
			quantity: 0,
			price_per_unit: 0,
			discount: 0,
			remarks: '',
			warehouse_uuid: '',
			box_uuid: '',
			rack_uuid: '',
			floor_uuid: '',
		},
	],
};

export type IPurchase = z.infer<typeof PURCHASE_SCHEMA>;

//* Purchase Return Schema
export const PURCHASE_RETURN_SCHEMA = z.object({
	purchase_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	purchase_return_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			purchase_return_uuid: STRING_OPTIONAL,
			product_uuid: STRING_REQUIRED,
			product_name: STRING_OPTIONAL,
			quantity: NUMBER_DOUBLE_REQUIRED,
			price_per_unit: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const PURCHASE_RETURN_NULL: Partial<IPurchaseReturn> = {
	purchase_uuid: '',
	remarks: '',
	purchase_return_entry: [
		{
			uuid: '',
			purchase_return_uuid: '',
			product_uuid: '',
			product_name: '',
			quantity: 0,
			price_per_unit: 0,
			remarks: '',
		},
	],
};

export type IPurchaseReturn = z.infer<typeof PURCHASE_RETURN_SCHEMA>;

//* Purchase Log
export const PURCHASE_LOG_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	purchase_uuid: STRING_OPTIONAL,
	product_uuid: STRING_REQUIRED,
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
	product_uuid: '',
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
	product_uuid: STRING_REQUIRED,
	product_name: STRING_OPTIONAL,
	quantity: NUMBER_DOUBLE_REQUIRED,
	price_per_unit: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PURCHASE_RETURN_LOG_NULL: Partial<IPurchaseReturnLog> = {
	uuid: '',
	purchase_return_uuid: '',
	product_uuid: '',
	product_name: '',
	quantity: 0,
	price_per_unit: 0,
	remarks: '',
};

export type IPurchaseReturnLog = z.infer<typeof PURCHASE_RETURN_LOG_SCHEMA>;
