import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin-settings'],

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

	//* employee type
	employeeType: () => [...hrQK.all(), 'employee-type'],
	employeeTypeByUUID: (uuid: string) => [...hrQK.employeeType(), uuid],

	//* holidays
	holidays: () => [...hrQK.all(), 'holidays'],
	holidaysByUUID: (uuid: string) => [...hrQK.holidays(), uuid],

	//*specials days
	specialDays: () => [...hrQK.all(), 'specials-days'],
	specialDaysByUUID: (uuid: string) => [...hrQK.specialDays(), uuid],

	//* sub department
	subDepartments: () => [...hrQK.all(), 'sub-department'],
	subDepartmentByUUID: (uuid: string) => [...hrQK.subDepartments(), uuid],
	//* work place
	workPlaces: () => [...hrQK.all(), 'work-place'],
	workPlaceByUUID: (uuid: string) => [...hrQK.workPlaces(), uuid],
};
