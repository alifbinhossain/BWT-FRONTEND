import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Leave Report

//* History
export const useReportLeaveHistory = <T>(from: string, to: string, category?: string, approval?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportLeaveHistory(from, to, category || '', approval || ''),
		url: `/report/leave-history-report?from_date=${from}&to_date=${to}&category_uuid=${category}&approval=${approval}`,
		enabled: !!from && !!to,
	});

//* Leave Balance
export const useReportLeaveBalance = <T>(from: string, to: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportLeaveBalance(from, to),
		url: `/report/leave-balance-report?from_date=${from}&to_date=${to}`,
		enabled: !!from && !!to,
	});
