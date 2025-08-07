import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],
	//* Report Late
	
	reportLate: (from: string, to: string, status?: string) => [
		...hrQK.all(),
		from,
		to,
		status,
		
	],
};
