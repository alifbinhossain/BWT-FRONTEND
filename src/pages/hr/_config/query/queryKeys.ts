export const hrQK = {
	all: () => ['admin'],

	//* department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	//* employee
	employees: (query?: string) => [...hrQK.all(), 'employees', query],
	employeesByUUID: (uuid: string) => [...hrQK.employees(), uuid],

	// * Device Permission
	devicePermission: (query?: string) => [...hrQK.all(), 'device-permission', query],
	devicePermissionByUUID: (uuid: string) => [...hrQK.devicePermission(), uuid],
	deviceAllocation: (uuid?: string) => [...hrQK.all(), 'allocation', uuid],

	//* Punch log
	punchLog: (query?: string) => [...hrQK.all(), 'punch-log', query],
	applyLeaveLog: (query?: string) => [...hrQK.all(), 'apply-leave-log', query],
	manualEntryLog: (query?: string) => [...hrQK.all(), 'manual-entry-log', query],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: (query: string) => [...hrQK.userDefault(), 'users', query],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],

	//* field visit
	manualEntry: (type?: string) => [...hrQK.all(), 'manual-entry', type],
	manualEntry2: () => [...hrQK.all(), 'manual-entry-2'],
	manualEntryByUUID: (uuid: string) => [...hrQK.manualEntry(), uuid],
	fieldVisitEmployeeInfoByUUID: (uuid: string) => [...hrQK.manualEntry(), 'employee-info', uuid],

	deviceList: () => [...hrQK.all(), 'device-list'],
	deviceListByUUID: (uuid: string) => [...hrQK.deviceList(), uuid],
};
