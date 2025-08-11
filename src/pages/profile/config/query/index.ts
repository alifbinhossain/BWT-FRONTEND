import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { hrQK } from './queryKeys';

// * User
export const useHrUsers = <T>(params: IParams) =>
	useTQuery<T>({
		queryKey: hrQK.user(params),
		url: addUrlParams('/hr/user', params),
	});

export const useHrUsersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userByUUID(uuid),
		url: `/hr/user/${uuid}`,
		enabled: !!uuid,
	});

export const useHrCanAccess = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userCanAccess(uuid),
		url: `/hr/user/can-access/${uuid}`,
		enabled: !!uuid,
	});

// * Department
export const useHrDepartments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.department(),
		url: '/hr/department',
	});

export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
		enabled: !!uuid,
	});

// * Designation
export const useHrDesignations = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.designation(),
		url: '/hr/designation',
	});

export const useHrDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.departmentByUUID(uuid),
		url: `/hr/department/${uuid}`,
		enabled: !!uuid,
	});

//* Order Info By Customer
export const useWorkOrderInfoByCustomer = <T>(customer_uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.orderInfoByCustomer(customer_uuid),
		url: `/work/info?customer_uuid=${customer_uuid}`,
		enabled: !!customer_uuid,
	});
export const useHRRoasterByEmployeeUUID = <T>(employee_uuid: string, month: number, year: number) =>
	useTQuery<T>({
		queryKey: hrQK.roasterByEmployeeUUID(employee_uuid, month, year),
		url: `/hr/roster-calendar/by/${employee_uuid}/${year}/${month}`,
		enabled: !!employee_uuid && !!month && !!year,
	});
