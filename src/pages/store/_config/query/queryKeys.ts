import { IParams } from '@/types';

export const storeQK = {
	all: () => ['store'],

	// department
	department: () => [...storeQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...storeQK.department(), uuid],

	// designation
	designation: () => [...storeQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...storeQK.designation(), uuid],

	// user
	userDefault: () => [...storeQK.all(), 'user'],
	user: ({ start_date, end_date, status }: IParams) => [...storeQK.userDefault(), start_date, end_date, status],
	userByUUID: (uuid: string) => [...storeQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...storeQK.userDefault(), 'can-access', uuid],

	// group
	group: () => [...storeQK.all(), 'designation'],
	groupByUUID: (uuid: string) => [...storeQK.group(), uuid],
};
