import { IPaginationQuery, IParams } from '@/types';

export const hrQK = {
	all: () => ['admin-shifts-management'],

	//* Shifts
	shifts: () => [...hrQK.all(), 'shifts'],
	shiftByUUID: (uuid: string) => [...hrQK.shifts(), uuid],
	//* Shifts Group
	shiftsGroup: () => [...hrQK.all(), 'shifts-group'],
	shiftGroupByUUID: (uuid: string) => [...hrQK.shiftsGroup(), uuid],
	//* Roaster
	roaster: () => [...hrQK.all(), 'roaster'],
	roasterByUUID: (uuid: string) => [...hrQK.roaster(), uuid],
	//* Log
	log: () => [...hrQK.all(), 'log'],
	logByUUID: (uuid: string) => [...hrQK.log(), uuid],
};
