//* Problems Columns
export type IProblemsTableData = {
	uuid: string;
	name: string;
	remarks: string;
	created_by: string;
	created_at: string;
	updated_at: string;
};
//* Job Columns
export type IJobTableData = {
	id: string;
	order_id: string;
	uuid: string;
	user_uuid: string;
	user_name: string;
	user_id: string;
	model_uuid: string;
	model_name: string;
	size_uuid: string;
	size_name: string;
	serial_no: string;
	problems_uuid: string[];
	problems_name: string[];
	problem_statement: string;
	accessories: string[];
	is_product_received: boolean;
	receive_date: string;
	warehouse_uuid: string;
	warehouse_name: string;
	rack_uuid: string;
	rack_name: string;
	floor_uuid: string;
	floor_name: string;
	box_uuid: string;
	box_name: string;
	created_by: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
//* Diagnosis Columns
export type IDiagnosisTableData = {
	id: string;
	uuid: string;
	order_uuid: string;
	engineer_uuid: string;
	problems_uuid: string[];
	problem_statement: string;
	status: boolean;
	status_update_date: string;
	proposed_cost: number;
	is_proceed_to_repair: boolean;
	remarks: string;
	created_by: string;
	created_at: string;
	updated_at: string;
};
//* Section Columns
export type ISectionTableData = {
	uuid: string;
	name: string;
	remarks: string;
	created_by: string;
	created_at: string;
	updated_at: string;
};
//* Process Columns
export type IProcessTableData = {
	id: string;
	uuid: string;
	section_uuid: string;
	diagnosis_uuid: string;
	engineer_uuid: string;
	problems_uuid: string[];
	problem_statement: string;
	status: boolean;
	status_update_date: string;
	is_transferred_for_qc: boolean;
	is_ready_for_delivery: boolean;
	warehouse_uuid: string;
	rack_uuid: string;
	floor_uuid: string;
	box_uuid: string;
	process_uuid: string;
	remarks: string;
	created_by: string;
	created_at: string;
	updated_at: string;
};
