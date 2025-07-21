import { IEmployeeTableData, IManualEntryTableData } from '@/pages/hr/_config/columns/columns.type';
import { IDefaultAddOrUpdateProps, IResponse, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
	IDepartmentTableData,
	IDesignationTableData,
	IPageAssign,
	IResetPassword,
	IUserTableData,
} from '../columns/columns.type';

//* user
export interface IUserAddOrUpdateProps {
	updatedData?: IUserTableData | null;
}
//* Employee

export interface IEmployeeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IEmployeeTableData | null;
}
export interface IEmployeeDeviceAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	employeeData: IEmployeeTableData | null;
	updatedData?: IEmployeeTableData | null;
}
export interface IPageAssignProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPageAssign | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IPageAssign | null>>;
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

export interface IResetPasswordProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IResetPassword | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IResetPassword | null>>;
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
//* department
export interface IDepartmentAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTableData | null;
}

//* designation
export interface IDesignationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDesignationTableData | null;
}

export type usersWithAccess = { value: string; label: string; can_access: string };
