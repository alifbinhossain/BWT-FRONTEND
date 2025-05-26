import { IPaginationQuery, IParams } from '@/types';

export const hrQK = {
	all: () => ['admin-leave'],

	//* leave policy
	leavePolicy: () => [...hrQK.all(), 'policy'],
	leavePolicyByUUID: (uuid: string) => [...hrQK.leavePolicy(), uuid],
	//* leave category
	leaveCategory: () => [...hrQK.all(), 'category'],
	leaveCategoryByUUID: (uuid: string) => [...hrQK.leaveCategory(), uuid],

	//*Configuration
	configuration: () => [...hrQK.all(), 'configuration'],
	configurationByUUID: (uuid: string) => [...hrQK.configuration(), uuid],

	//*Apply Leave
	applyLeave: () => [...hrQK.all(), 'apply-leave'],
	applyLeave2: (pagination: IPaginationQuery) => [...hrQK.all(), 'apply-leave', ...Object.values(pagination)],
	applyLeaveByUUID: (uuid: string) => [...hrQK.applyLeave(), uuid],
	employeeLeaveDetails: (employee_uuid: string, uuid: string) => [
		...hrQK.all(),
		'employee-leave-details',
		employee_uuid,
		uuid,
	],
};
