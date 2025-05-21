export const hrQK = {
	all: () => ['admin'],

	//* department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	//* employee
	employees: () => [...hrQK.all(), 'employees'],
	employeesByUUID: (uuid: string) => [...hrQK.employees(), uuid],

	//* Punch log
	punchLog: () => [...hrQK.all(), 'punch-log'],
	applyLeaveLog: () => [...hrQK.all(), 'apply-leave-log'],
	manualEntryLog: (query?: string) => [...hrQK.all(), 'manual-entry-log', query],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: (query: string) => [...hrQK.userDefault(), 'users', query],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],

	//* field visit
	manualEntry: (type?: string) => [...hrQK.all(), 'manual-entry', type],
	manualEntryByUUID: (uuid: string) => [...hrQK.manualEntry(), uuid],
	fieldVisitEmployeeInfoByUUID: (uuid: string) => [...hrQK.manualEntry(), 'employee-info', uuid],

	deviceList: () => [...hrQK.all(), 'device-list'],
	deviceListByUUID: (uuid: string) => [...hrQK.deviceList(), uuid],
};
