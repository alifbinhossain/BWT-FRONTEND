import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Summery
export const useReportLate = <T>(from: string, to: string, status?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportLate(from, to, status || ''),
		url: `/report/late-report?from_date=${from}&to_date=${to}&status=${status}`,
		enabled: !!from && !!to,
	});
