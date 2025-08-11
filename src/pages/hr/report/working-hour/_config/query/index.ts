import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Daily Late
export const useReportWorkingHour = <T>(from: string, to: string, department?: string, status?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportWorkingHour(from, to, department || '', status || ''),
		url: `/report/working-hour-report?from_date=${from}&&to_date=${to}&department_uuid=${department}&status=${status}`,
		enabled: !!from && !!to,
	});
