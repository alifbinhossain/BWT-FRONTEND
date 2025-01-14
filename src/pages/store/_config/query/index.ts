import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { storeQK } from './queryKeys';

// * User
export const useHrUsers = <T>(params: IParams) =>
	useTQuery<T>({
		queryKey: storeQK.user(params),
		url: addUrlParams('/hr/user', params),
	});

// * Department
export const useHrDepartments = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.department(),
		url: '/hr/department',
	});

export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
		enabled: !!uuid,
	});

// * Group
export const useStoreGroups = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.group(),
		url: '/store/group',
	});

export const useStoreGroupsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.groupByUUID(uuid),
		url: `/store/group/${uuid}`,
		enabled: !!uuid,
	});
