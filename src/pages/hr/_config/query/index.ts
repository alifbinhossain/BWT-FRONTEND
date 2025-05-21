import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { hrQK } from './queryKeys';

// * User

export const useHrUsers = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.user(query || ''),
		url: `/hr/user?${query}`,
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

// * Employee
export const useHrEmployees = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.employees(),
		url: `/hr/employee`,
	});

// ? LOGS
// * Punch log
export const useHrPunchLogs = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.punchLog(),
		url: '/hr/punch-log',
	});

// * Apply leave log
export const useHrApplyLeaveLog = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.applyLeaveLog(),
		url: '/hr/apply-leave',
	});

// * Manual entry log
export const useHrManualEntryLog = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntryLog(query),
		url: query ? `/hr/manual-entry?${query}` : '/hr/manual-entry',
	});

export const useHrEmployeesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeesByUUID(uuid),
		url: `/hr/employee/${uuid}`,
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

export const useHrUsersWithAccess = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.userWithAccess(),
		url: '/other/hr/users-can-access/value/label',
	});

export const useHrManualEntry = <T>(type?: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntry(type),
		url: type ? `/hr/manual-entry?type=${type}` : '/hr/manual-entry',
	});

export const useHrManualEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.manualEntryByUUID(uuid),
		url: `/hr/manual-entry/${uuid}`,
		enabled: !!uuid,
	});
export const useHrEmployeeFieldVisitInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.fieldVisitEmployeeInfoByUUID(uuid),
		url: `/hr/manual-entry-details/by/${uuid}`,
		enabled: !!uuid,
	});

export const useHrDeviceList = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.deviceList(),
		url: '/hr/device-list',
	});
export const useHrDeviceListByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.deviceListByUUID(uuid),
		url: `/hr/device-list/${uuid}`,
		enabled: !!uuid,
	});
