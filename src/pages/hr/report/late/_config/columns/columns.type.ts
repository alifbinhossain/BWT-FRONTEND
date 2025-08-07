//* Late Records
export type ILateRecords = {
	employee_id: string;
	employee_uuid: string;
	employee_name: string;
	employee_department: string;
	employee_designation: string;
	shift: string;
	entry_time: string;
	late_hours: string;
};
//* Late
export type ILate = {
	data: string;
	late_count: number;
	late_records: ILateRecords[];
};
