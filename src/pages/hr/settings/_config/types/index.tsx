import { IDefaultAddOrUpdateProps, IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { extend } from 'lodash';

import { IDepartmentTableData, IDesignationTableData } from '../columns/columns.type';

//* department
export interface IDepartmentAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDepartmentTableData | null;
}

//* designation
export interface IDesignationAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDesignationTableData | null;
}
//* employee types
export interface IEmployeeTypeAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: any | null;
}
//* holidays
export interface IHolidayAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: any | null;
}
//* special days
export interface ISpecialDayAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: any | null;
}
//* sub departments
export interface ISubDepartmentAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: any | null;
}

//* workplace
export interface IWorkplaceAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: any | null;
}
