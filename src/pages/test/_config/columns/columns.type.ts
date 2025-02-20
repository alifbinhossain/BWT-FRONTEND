//* Group
export type IGroupTableData = {
	uuid: string;
	group_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Category
export type ICategoryTableData = {
	uuid: string;
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Brand
export type IBrandTableData = {
	uuid: string;
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Model
export type IModelTableData = {
	uuid: string;
	name: string;
	brand_uuid: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Size
export type ISizeTableData = {
	uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Vendor
export type IVendorTableData = {
	uuid: string;
	model_uuid: string;
	name: string;
	company_name: string;
	phone: string;
	address: string;
	description: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Product
export type IProductTableData = {
	uuid: string;
	category_uuid: string;
	model_uuid: string;
	size_uuid: string;
	name: string;
	warranty_days: number;
	service_warranty_days: number;
	is_maintaining_stock: boolean;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Purchase
export type IPurchaseTableData = {
	uuid: string;
	id: string;
	vendor_uuid: string;
	branch_uuid: string;
	date: string;
	payment_mode: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Purchase Entry
export type IPurchaseEntryTableData = {
	uuid: string;
	purchase_uuid: string;
	purchase_id: string;
	stock_uuid: string;
	stock_id: string;
	serial_no: string;
	quantity: number;
	price_per_unit: number;
	discount: number;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Purchase Details
export type IPurchaseDetails = {
	uuid: string;
	purchase_id: string;
	vendor_uuid: string;
	vendor_name: string;
	branch_uuid: string;
	branch_name: string;
	date: string;
	payment_mode: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	purchase_entry: IPurchaseEntryTableData[];
};
//* Purchase Return
export type IPurchaseReturnTableData = {
	uuid: string;
	id: string;
	purchase_uuid: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Purchase Return Entry
export type IPurchaseReturnEntryTableData = {
	uuid: string;
	purchase_return_uuid: string;
	purchase_return_id: string;
	product_uuid: string;
	quantity: number;
	price_per_unit: number;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Purchase Return Details
export type IPurchaseReturnDetails = {
	uuid: string;
	purchase_return_id: string;
	purchase_uuid: string;
	purchase_id: string;
	remarks: string;
	created_at: string;
	updated_at: string;
	purchase_return_entry: IPurchaseReturnEntryTableData[];
};
//* Stock
export type IStockTableData = {
	uuid: string;
	stock_id: string;
	product_uuid: string;
	product_name: string;
	warehouse1: number;
	warehouse2: number;
	warehouse3: number;
	remarks: string;
};
// * Internal Transfer
export interface IInternalTransferTableData {
	uuid: string;
	internal_transfer_id: string;
	stock_uuid: string;
	stock_id: string;
	from_branch_uuid: string;
	to_branch_uuid: string;
	warehouse_uuid: string;
	rack_uuid: string;
	floor_uuid: string;
	box_uuid: string;
	quantity: number;
	remarks: string;
	created_at: string;
	created_by: string;
	updated_at: string;
}

//* Internal Transfer Action

export type IStockActionTrx = {
	uuid: string;
	name: string;
};
//* Branch
export type IBranchTableData = {
	uuid: string;
	name: string;
	address: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Warehouse
export type IWarehouseTableData = {
	uuid: string;
	brach_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Room
export type IRoomTableData = {
	uuid: string;
	warehouse_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Rack
export type IRackTableData = {
	uuid: string;
	warehouse_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Floor
export type IFloorTableData = {
	uuid: string;
	rack_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Box
export type IBoxTableData = {
	uuid: string;
	floor_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
