// import { IResponse } from '@/types';
// import { UseMutationResult } from '@tanstack/react-query';
// import { AxiosError } from 'axios';

import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import {
	IAccessoriesTableData,
	IDiagnosisTableData,
	IOrderTableData,
	IProblemsTableData,
	IProcessTableData,
	ISectionTableData,
	IZoneTableData,
} from '../columns/columns.type';

//* Diagnosis
export interface IDiagnosisAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDiagnosisTableData | null;
}

//* Problems
export interface IProblemAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProblemsTableData | null;
}

//* Orders
export interface IOrderAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IOrderTableData | null;
}

//* Diagnosis
export interface IDiagnosisAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IDiagnosisTableData | null;
}
//* Process
export interface IProcessAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProcessTableData | null;
}

//*Sections
export interface ISectionAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ISectionTableData | null;
}

//* Zone
export interface IZoneAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IZoneTableData | null;
}

//*Accessories
export interface IAccessoriesAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IAccessoriesTableData | null;
}

//* Product
export type TProductProps = {
	brand_name: string;
	model_name: string;
	serial_no?: string;
};
export type TStoreProductProps = {
	name: string;
	model_name: string;
	category_name?: string;
	size_name?: string;
};
export type TWarrantyProps = {
	service_warranty: number;
	warranty: number;
};
export type TLocationProps = {
	branch_name: string;
	warehouse_name: string;
	rack_name?: string;
	floor_name?: string;
	box_name?: string;
};

export type TProblemProps = {
	problems_name: string;
	problem_statement?: string;
};
