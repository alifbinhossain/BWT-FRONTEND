// Group
export type IGroupTableData = {
	uuid: string;
	group_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
// Category
export type ICategoryTableData = {
	uuid: string;
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
// Brand
export type IBrandTableData = {
	uuid: string;
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
// Size
export type ISizeTableData = {
	uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Vendor
export type IVendorTableData = {
	uuid: string;
	brand_uuid: string;
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
//Product
export type IProductTableData = {
	uuid: string;
	category_uuid: string;
	brand_uuid: string;
	size_uuid: string;
	name: string;
	warranty_days: number;
	service_warranty_days: number;
	is_maintaining_stock: boolean;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Purchase
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
//Purchase Entry
export type IPurchaseEntryTableData = {
	uuid: string;
	purchase_uuid: string;
	stock_uuid: string;
	stock_id: string;
	serial_no: string;
	quantity: string;
	price_per_unit: string;
	discount: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
// Purchase Details
export type IPurchaseDetails = {
	uuid: string;
	id: string;
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
//Stock
export type IStockTableData = {
	uuid: string;
	id: string;
	product_uuid: string;
	warehouse1: number;
	warehouse2: number;
	warehouse3: number;
	remarks: string;
};
//Branch
export type IBranchTableData = {
	uuid: string;
	name: string;
	address: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Warehouse
export type IWarehouseTableData = {
	uuid: string;
	brach_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Room
export type IRoomTableData = {
	uuid: string;
	warehouse_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Rack
export type IRackTableData = {
	uuid: string;
	room_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Floor
export type IFloorTableData = {
	uuid: string;
	rack_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//Box
export type IBoxTableData = {
	uuid: string;
	floor_uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
