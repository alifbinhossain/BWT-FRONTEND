import { IDefaultAddOrUpdateProps, IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IRoasterColumnsType, IShiftsColumnsType, IShiftsGroupColumnsType } from '../columns/columns.type';

//* Shifts
export interface IShiftsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IShiftsColumnsType | null;
}

//* Shifts Groups
export interface IShiftsGroupAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IShiftsGroupColumnsType | null;
}

//*Roaster
export interface IRoasterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IRoasterColumnsType | null;
}

