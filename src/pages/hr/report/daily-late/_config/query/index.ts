import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Daily Late
export const useReportDailyLate = <T>(date: string, department?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportDailyLate(date, department || ''),
		url: `/report/daily-late-report?from_date=${date}&&to_date=${date}&department_uuid=${department}`,
		enabled: !!date,
	});
