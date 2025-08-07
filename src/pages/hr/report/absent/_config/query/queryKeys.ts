import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* Report Daily Absent
	reportDailyAbsent: (date: string, status?: string, department?: string) => [
		...hrQK.all(),
		date,
		status,
		department,
	],
	//* Report Leave Balance
	reportAbsentSummery: (from: string, to: string, status?: string, department?: string) => [
		...hrQK.all(),
		from,
		to,
		status,
		department,
	],
};
