import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: (query: string) => [...hrQK.userDefault(), 'users', query],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],
};
