//* Policy
export type IPolicyTableData = {
	uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

//* category
export type ICategoryTableData = {
	uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

export type IConfigurationEntryTableData = {
	uuid: string;
	leave_category_uuid: string;
	number_of_leaves_to_provide_file: number;
	maximum_number_of_allowed_leaves: number;
	consecutive_days: number;
	maximum_number_of_leaves_to_carry: number;
	count_off_days_as_leaves: boolean;
	enable_previous_day_selection: boolean;
	maximum_number_of_leave_per_month: number;
	previous_date_selected_limit: number;
	applicability: 'both' | 'male' | 'female' | 'other';
	eligible_after_joining: number;
	enable_pro_rata: boolean;
	max_avail_time: boolean;
	enable_earned_leave: boolean;
};
//*Configuration
export type IConfigurationTableData = {
	uuid: string;
	name: string;
	created_at: string;
	updated_at: string;
	remarks: string|null;
	configuration_entry: IConfigurationEntryTableData[];
};
