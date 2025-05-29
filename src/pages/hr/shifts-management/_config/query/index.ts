import useTQuery from '@/hooks/useTQuery';

import { hrQK } from './queryKeys';

// * shifts
export const useHrShifts = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.shifts(),
		url: '/hr/shifts',
	});

export const useHrShiftsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.shiftByUUID(uuid),
		url: `/hr/shifts/${uuid}`,
		enabled: !!uuid,
	});
// * shifts group
export const useHrShiftsGroup = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.shiftsGroup(),
		url: '/hr/shift-group',
	});
export const useHrShiftsGroupByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.shiftGroupByUUID(uuid),
		url: `/hr/shift-group/${uuid}`,
		enabled: !!uuid,
	});
// * roaster
export const useHrRoaster = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.roaster(),
		url: '/hr/roster',
	});
export const useHrRoasterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.roasterByUUID(uuid),
		url: `/hr/roster/${uuid}`,
		enabled: !!uuid,
	});
// * log
export const useHrLog = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.log(),
		url: '/hr/roster-log',
	});
export const useHrLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.logByUUID(uuid),
		url: `/hr/roster-log/${uuid}`,
		enabled: !!uuid,
	});
