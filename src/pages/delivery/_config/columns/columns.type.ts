//* Vehicle
export type IVehicleTableData = {
	uuid: string;
	name: string;
	no: string;
	updated_at: string;
	remarks: string;
};
//* Courier
export type ICourierTableData = {
	uuid: string;
	name: string;
	brach: string;
	updated_at: string;
	remarks: string;
};

//* Challan Entry
export type IChallanEntryTableData = {
	uuid: string;
	challan_uuid: string;
	description: string;
	model_name: string;
	brand_name: string;
	serial_no: string;
	order_uuid: string;
	info_uuid: string;
	accessories: string[];
	accessories_name: string[];
	unit: string;
	bill_amount: number;
	remarks: string;
};
//* Challan
export type IChallanTableData = {
	challan_no: string;
	location: string;
	branch_name: string;
	zone_name: string;
	phone_no: string;
	payment_method: 'cash';
	order_created_by_name: string;
	customer_phone: string;
	id: string;
	uuid: string;
	challan_type: string;
	customer_uuid: string;
	customer_name: string;
	type: 'customer_pickup' | 'employee_delivery' | 'courier_delivery' | 'vehicle_delivery';
	employee_uuid: string;
	employee_name: string;
	vehicle_uuid: string;
	vehicle_name: string;
	courier_uuid: string;
	courier_name: string;
	courier_branch: string;
	is_delivery_complete: boolean;
	brach: string;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	challan_entries: IChallanEntryTableData[];
};
