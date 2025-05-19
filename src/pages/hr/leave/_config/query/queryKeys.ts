import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin-leave'],

	//* leave policy
	leavePolicy: () => [...hrQK.all(), 'policy'],
	leavePolicyByUUID: (uuid: string) => [...hrQK.leavePolicy(), uuid],
	//* leave category
	leaveCategory: () => [...hrQK.all(), 'category'],
	leaveCategoryByUUID: (uuid: string) => [...hrQK.leaveCategory(), uuid],
};
