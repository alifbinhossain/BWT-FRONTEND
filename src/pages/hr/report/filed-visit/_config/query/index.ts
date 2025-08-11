import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Daily Late
export const useReportFieldVisit = <T>(from: string, to: string, status?: string, approval?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportFieldVisit(from, to, approval || '', status || ''),
		url: `/report/field-visit-report?from_date=${from}&&to_date=${to}&status=${status}&approval=${approval}`,
		enabled: !!from && !!to,
	});
