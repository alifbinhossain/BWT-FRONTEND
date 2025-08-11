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

//* Employee
export type IEmployeeTableData = {
	uuid: string;
	id: number;
	gender: string;
	user_uuid: string;
	users_name: string;
	start_date: string;
	workplace_uuid: string;
	workplace_name: string;
	rfid: string;
	sub_department_uuid: string;
	sub_department_name: string;
	primary_display_text: string;
	secondary_display_text: string;
	configuration_uuid: string;
	employment_type_uuid: string;
	employment_type_name: string;
	end_date: string;
	shift_group_uuid: string;
	shift_group_name: string;
	line_manager_uuid: string;
	hr_manager_uuid: string;
	is_admin: boolean;
	is_hr: boolean;
	is_line_manager: boolean;
	allow_over_time: boolean;
	exclude_from_attendance: boolean;
	status: boolean;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	employee_name: string;
	email: string;
	pass: string;
	designation_uuid: string;
	designation_name: string;
	department_uuid: string;
	department_name: string;
	employee_id: string;
	leave_policy_uuid: string;
	leave_policy_name: string;
	report_position: string;
};

//* Manual Entry
export interface IManualEntryTableData {
	uuid: string;
	employee_uuid: string;
	employee_name: string;
	type: string;
	entry_time: string;
	exit_time: string;
	approval: boolean;
	reason: string;
	date_range: string;
	area: string;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	department_uuid: string;
	department_name: string;
	designation_uuid: string;
	designation_name: string;
}

//* Device List
export interface IDeviceListTableData {
	uuid: string;
	id: number;
	name: string;
	identifier: string;
	location: string;
	connection_status: boolean;
	phone_number: string;
	description: string;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: any;
	remarks: string;
}

//* Device Permission
export interface IDevicePermissionTableData {
	uuid: string;
	device_list_uuid: string;
	device_list_name: string;
	employee_uuid: string;
	employee_name: string;
	permission_type: 'permanent' | 'temporary';
	temporary_from_date: string | null;
	temporary_to_date: string | null;
	rfid_access: boolean;
	fingerprint_access: boolean;
	face_access: boolean;
}

//* Punch log
export interface IPunchLogTableData {
	uuid: string;
	employee_uuid: string;
	employee_name: string;
	device_list_uuid: string;
	device_list_name: string;
	punch_type: string;
	punch_time: string;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
}

// apply leave log
export type IApplyLeaveLogTableData = {
	uuid: string;
	employee_uuid: string;
	employee_name: string;
	leave_category_uuid: string;
	leave_category_name: string;
	year: number;
	type: string;
	from_date: string;
	to_date: string;
	reason: string;
	file?: string | null;
	approved: boolean;
};

// Manual entry log
export type IManualEntryLogTableData = {
	uuid: string;
	employee_uuid: string;
	employee_name: string;
	type: string;
	entry_time: string | null;
	exit_time: string | null;
	reason: string;
	area: string | null;
	device_list_uuid: string;
	approved: boolean;
};

// Late approval
// Manual entry log
export type ILateApprovalTableData = {
	uuid: string;
	employee_uuid: string;
	employee_name: string;
	type: string;
	reason: string;
	approved: boolean;
};

//? Report ?//

//* Individual Report
export type DateAccessor = {
	punch_date: Date;
	entry_time: Date;
	exit_time: Date;
	hours_worked: string | number;
	expected_hours: string | number;
	status: string;
	late_time: Date;
	late_hours: string | number;
	early_exit_before: string;
	early_exit_hours: number;
};

export type IIndividualReportTableData = {
	user_uuid: string;
	employee_name: string;
	punch_date: string;
	entry_time: string;
	exit_time: string;
	hours_worked: number;
	expected_hours: number;
	shift_details: {
		name: string;
		start_time: Date;
		end_time: Date;
	};
};

//* Department Report
export type DateAccessorDepartment = {
	punch_date: Date;
	entry_time: Date;
	exit_time: Date;
	hours_worked: number;
	expected_hours: number;
	status: string;
	late_time: Date;
	late_hours: number;
	early_exit_before: string;
	early_exit_hours: number;
};

export type IDepartmentReportTableData = {
	user_uuid: string;
	employee_name: string;
	designation_uuid: string;
	designation_name: string;
	department_uuid: string;
	department_name: string;
	workplace_uuid: string;
	workplace_name: string;
	employment_type_uuid: string;
	employment_type_name: string;
	present_days: string;
	absent_days: string;
	leave_days: string;
};

//* Monthly Report
export type IMonthlyReportTableData = {
	employee_uuid: string;
	user_uuid: string;
	employee_name: string;
	designation_uuid: string | null;
	designation_name: string | null;
	department_uuid: string | null;
	department_name: string | null;
	workplace_uuid: string | null;
	workplace_name: string | null;
	employment_type_uuid: string | null;
	employment_type_name: string | null;
	total_days: number;
	working_days: number;
	present_days: number;
	absent_days: number;
	leave_days: number;
	off_days: number;
	general_holidays: number;
	special_holidays: number;
	late_days: number;
	approved_lates: number;
	field_visit_days: number;
	expected_hours: number;
	total_late_hours: number;
	working_hours: number;
	difference_hours: number;
};
