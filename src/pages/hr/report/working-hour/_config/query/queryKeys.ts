import { report } from 'process';
import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* Report Working Hour
	reportWorkingHour: (from: string, to: string, department?: string, status?: string) => [
		...hrQK.all(),
		from,
		to,
		department,
		status,
		'reportWorkingHour',
	],
};
