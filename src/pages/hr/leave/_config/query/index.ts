import useTQuery from '@/hooks/useTQuery';

import { hrQK } from './queryKeys';

// * Leave Policy
export const useHrLeavePolicy = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.leavePolicy(),
		url: '/hr/leave-policy',
	});

export const useHrLeavePolicyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.leavePolicyByUUID(uuid),
		url: `/hr/leave-policy/${uuid}`,
		enabled: !!uuid,
	});
//* Leave Category
export const useHrLeaveCategory = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.leaveCategory(),
		url: '/hr/leave-category',
	});
export const useHrLeaveCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.leaveCategoryByUUID(uuid),
		url: `/hr/leave-category/${uuid}`,
		enabled: !!uuid,
	});
//*Configuration
export const useHrConfiguration = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.configuration(),
		url: '/hr/configuration',
	});
export const useHrConfigurationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.configurationByUUID(uuid),
		url: `/hr/configuration-entry-details/by/${uuid}`,
		enabled: !!uuid,
	});
//* Apply Leave
export const useHrApplyLeave = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.applyLeave(),
		url: '/hr/apply-leave',
	});
export const useHrApplyLeaveByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.applyLeaveByUUID(uuid),
		url: `/hr/apply-leave/${uuid}`,
		enabled: !!uuid,
	});
export const useHrEmployeeLeaveDetails = <T>(employee_uuid: string, uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.employeeLeaveDetails(employee_uuid, uuid),
		url: `/hr/employee-leave-information-details/by/${employee_uuid}?apply_leave_uuid=${uuid}`,
		enabled: !!uuid && !!employee_uuid,
	});
