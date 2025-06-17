export interface IPunchLogsPerDayTableData {
	user_uuid: string;
	employee_name: string;
	punch_date: string;
	entry_time: string;
	exit_time: string;
	duration_hours: number;
	created_at: string;
}

export interface IAttendanceReportTableData {
	user_uuid: string;
	employee_name: string;
	punch_date: string;
	entry_time: string;
	exit_time: string;
	hours_worked: number;
	expected_hours: number;
}
