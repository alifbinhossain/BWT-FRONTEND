//* History
export type IDailyAbsentTableData = {
	employee_name: string;
	employment_type_name: string;
	leave_policy_name: string;
	department_name: string;
	designation_name: string;
	employee_uuid: string;
	unauthorized_absent_days: number;
	shift_uuid: string;
	shift_group_name: string;
	start_time: string;
	end_time: string;
	date: string;
};
type IAbsent = {
	shift_uuid: string;
	shift_name: string;
	start_time: string;
	end_time: string;
	date: string;
};
//* Leave Balance
export type IAbsentSummery = {
	employee_name: string;
	employment_type_name: string;
	leave_policy_name: string;
	department_name: string;
	designation_name: string;
	employee_uuid: string;
	unauthorized_absent_days: number;
	absent_days: IAbsent[];
};
