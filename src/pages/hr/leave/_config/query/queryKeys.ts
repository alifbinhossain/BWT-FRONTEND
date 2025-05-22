import { IParams } from '@/types';

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
	applyLeaveByUUID: (uuid: string) => [...hrQK.applyLeave(), uuid],
};
