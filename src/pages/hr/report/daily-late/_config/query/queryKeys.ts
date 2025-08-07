import { IPaginationQuery } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* Report Daily Late
	reportDailyLate: (date: string, department?: string) => [...hrQK.all(), date, department],
};
