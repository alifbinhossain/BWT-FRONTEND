//* History
export type IHistoryTableData = {
	sl: number;
	employee_name: string;
	employee_department: string;
	employee_designation: string;
	employee_uuid: string;
	type: string;
	policy_uuid: string;
	policy_name: string;
	category_uuid: string;
	category_name: string;
	from: string;
	to: string;
	Days: string;
	status: 'pending' | 'approved' | 'rejected';
	reason: string;
};
type ICategories = {
	leave_category_uuid: string;
	leave_category_name: string;
	allowed_leaves: number;
	used_days: number;
	remaining_days: number;
};
//* Leave Balance
export type ILeaveBalance = {
	employee_name: string;
	employment_type_name: string;
	leave_policy_name: string;
	employee_department: string;
	employee_designation: string;
	employee_uuid: string;
	leave_categories: ICategories[];
};
