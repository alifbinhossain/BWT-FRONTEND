import { report } from 'process';
import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* Report Field Visit
	reportFieldVisit: (from: string, to: string, approval?: string, status?: string) => [
		...hrQK.all(),
		from,
		to,
		approval,
		status,
	],
};
