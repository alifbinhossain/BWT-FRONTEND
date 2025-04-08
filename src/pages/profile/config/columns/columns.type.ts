import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';

//* Department
export type IDepartmentTableData = {
	uuid: string;
	department: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

//* Designation
export type IDesignationTableData = {
	uuid: string;
	designation: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

//* User
export type IUserTableData = {
	uuid: string;
	name: string;
	email: string;
	business_type: 'company' | 'individual';
	designation_uuid: string;
	designation: string;
	department_uuid: string;
	department: string;
	user_type: 'employee' | 'customer';
	ext: string;
	phone: string;
	created_at: string;
	updated_at: any;
	status: string;
	remarks: string;
};

//* Reset Password
export type IResetPassword = {
	uuid: string;
	name: string;
};

//* Page Assign
export type IPageAssign = {
	uuid: string;
	name: string;
};
//* Info Columns
export type IInfoTableData = {
	uuid: string;
	is_new_customer?: boolean;
	name: string;
	phone: string;
	user_phone: string;
	user_id: string;
	id: string;
	info_id: string;
	user_uuid: string;
	user_name: string;
	designation_uuid: string;
	department_uuid: string;
	remarks: string;
	created_by: string;
	created_at: string;
	updated_at: string;
	is_product_received: boolean;
	received_date: string;
	order_entry: IOrderTableData[];
};
