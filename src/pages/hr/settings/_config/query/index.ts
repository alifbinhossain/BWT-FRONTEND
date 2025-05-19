import useTQuery from '@/hooks/useTQuery';

import { hrQK } from './queryKeys';

// * User
export const useHrUsers = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.user(query || ''),
		url: `/hr/user?${query}`,
	});
// * Department
export const useHrDepartments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.department(),
		url: '/hr/department',
	});
export const useHrDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.departmentByUUID(uuid),
		url: `/hr/department/${uuid}`,
		enabled: !!uuid,
	});

// * Designation
export const useHrDesignations = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.designation(),
		url: '/hr/designation',
	});
export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
		enabled: !!uuid,
	});
// * Employee Types
export const useHrEmployeeTypes = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employeeType(),
		url: '/hr/employment-type',
	});
export const useHrEmployeeTypeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeTypeByUUID(uuid),
		url: `/hr/employment-type/${uuid}`,
		enabled: !!uuid,
	});
//* Holidays
export const useHrHolidays = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.holidays(),
		url: '/hr/general-holiday',
	});
export const useHrHolidaysByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.holidaysByUUID(uuid),
		url: `/hr/general-holiday/${uuid}`,
		enabled: !!uuid,
	});
// * Specials Days
export const useHrSpecialDays = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.specialDays(),
		url: '/hr/special-holidays',
	});
export const useHrSpecialDaysByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.specialDaysByUUID(uuid),
		url: `/hr/special-holidays/${uuid}`,
		enabled: !!uuid,
	});
//* Sub Departments
export const useHrSubDepartments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.subDepartments(),
		url: '/hr/sub-department',
	});
export const useHrSubDepartmentByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.subDepartmentByUUID(uuid),
		url: `/hr/sub-department/${uuid}`,
		enabled: !!uuid,
	});
// * Work Places
export const useHrWorkPlaces = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.workPlaces(),
		url: '/hr/workplace',
	});
export const useHrWorkPlaceByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.workPlaceByUUID(uuid),
		url: `/hr/workplace/${uuid}`,
		enabled: !!uuid,
	});
