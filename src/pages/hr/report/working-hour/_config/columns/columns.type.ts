//* Working Hour
export type IWorkingHourTableData = {
	employee_name: string;
	employment_type_name: string;
	employee_uuid: string;
	designation_name: string;
	department_name: string;
	unauthorized_absent_days: number;
	shift_uuid: string;
	shift_group_name: string;
	start_time: string;
	end_time: string;
	date: string;
	shift_details: {
		name: string;
		start_time: Date;
		end_time: Date;
	};
};
