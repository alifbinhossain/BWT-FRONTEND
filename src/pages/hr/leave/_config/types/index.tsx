import { IEmployeeTableData } from '@/pages/hr/_config/columns/columns.type';
import { IDefaultAddOrUpdateProps, IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
	IApplyLeaveTableData,
	ICategoryTableData,
	IConfigurationTableData,
	IPolicyTableData,
} from '../columns/columns.type';


//* Policy
export interface IPolicyAddOrUpdateProps extends IDefaultAddOrUpdateProps{
	updatedData?: IPolicyTableData | null;
}

//* Category
export interface ICategoryAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICategoryTableData | null;
}

//* Configuration
export interface IConfigurationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IConfigurationTableData | null;
}

//* Apply Leave
export interface IApplyLeaveAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IApplyLeaveTableData | null;
}

export interface ILeaveEmployee extends IEmployeeTableData {
	type: 'full' | 'half';
	remaining_leave_information: [
		{
			name: string;
			used_leave_days: number;
			remaining_leave_days: number;
			maximum_number_of_allowed_leaves?: number;
			balance?: number;
		},
	];
	leave_application_information: {
		file: string;
		type: 'full' | 'half';
		date_range: string;
		uuid: string;
		reason: string;
		remarks: string;
		to_date: string;
		approval: 'approved' | 'pending' | 'rejected';
		from_date: string;
		created_at: string;
		created_by: string;
		created_by_designation: string;
		created_by_department: string;
		updated_at: string;
		employee_name: string;
		employee_uuid: string;
		created_by_name: string;
		leave_category_name: string;
		leave_category_uuid: string;
		number_of_days: number;
	};
	last_five_leave_applications: [
		{
			file: string;
			type: 'full' | 'half';
			date_range: string;
			uuid: string;
			reason: string;
			remarks: string;
			to_date: string;
			approval: 'approved' | 'pending' | 'rejected';
			from_date: string;
			created_at: string;
			created_by: string;
			updated_at: string;
			employee_name: string;
			employee_uuid: string;
			created_by_name: string;
			leave_category_name: string;
			leave_category_uuid: string;
			number_of_days: number;
		},
	];
}
