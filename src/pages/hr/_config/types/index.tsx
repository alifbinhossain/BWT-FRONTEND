// import { IResponse } from '@/types';
// import { UseMutationResult } from '@tanstack/react-query';
// import { AxiosError } from 'axios';

import { IDefaultAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
	IDepartmentTableData,
	IDesignationTableData,
	IEmployeeTableData,
	IManualEntryTableData,
	IPageAssign,
	IResetPassword,
	IUserTableData,
} from '../columns/columns.type';

export interface IAddOrUpdateProps<T> extends IDefaultAddOrUpdateProps {
	updatedData?: T | null;
}
//* Department
export interface IDepartmentAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTableData | null;
}

// //* user
export interface IUserAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IUserTableData | null;
}

// //* Employee
export interface IEmployeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IEmployeeTableData | null;
}
//* IPage Assign
export interface IPageAssignProps{
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	updatedData?: IPageAssign | null;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
//* IReset Password
export interface IResetPasswordProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	updatedData?: IResetPassword | null;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

// //* designation
export interface IDesignationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDesignationTableData | null;
}

export type usersWithAccess = { value: string; label: string; can_access: string };

export interface IFieldVisitEmployee extends IEmployeeTableData {
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
	created_by_designation: string;
	created_by_department: string;
	field_visit: IManualEntryTableData[];
}
