import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* Report Leave History
	reportLeaveHistory: (from: string, to: string, category: string, approval?: string) => [
		...hrQK.all(),
		from,
		to,
		category,
		approval,
		'reportLeaveHistory',
	],
	//* Report Leave Balance
	reportLeaveBalance: (from: string, to: string) => [...hrQK.all(), from, to,'reportLeaveBalance'],
};
