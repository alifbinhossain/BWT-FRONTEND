import { IPaginationQuery } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addQueryParams from '@/utils/addQueryParams';

import { hrQK } from './queryKeys';

//* Leave Report

//* Daily Absent Report
export const useReportDailyAbsent = <T>(date: string, status?: string, department?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportDailyAbsent(date, status || '', department || ''),
		url: `/report/daily-absent-report?from_date=${date}&status=${status}&department_uuid=${department}`,
		enabled: !!date,
	});

//* Summery
export const useReportAbsentSummery = <T>(from: string, to: string, status?: string, department?: string) =>
	useTQuery<T>({
		queryKey: hrQK.reportAbsentSummery(from, to, status || '', department || ''),
		url: `/report/absent-summary-report?from_date=${from}&to_date=${to}&status=${status}&department_uuid=${department}`,
		enabled: !!from && !!to,
	});
