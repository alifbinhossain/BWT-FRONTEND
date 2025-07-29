import { IPaginationQuery } from '@/types';

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

	//* employee attendance report
	employeeAttendanceReportByEmployeeUUID: (uuid: string, query: string) => [
		...hrQK.all(),
		'employee-attendance-report',
		uuid,
		'by',
		query,
	],
	//* employee summary report
	employeeSummaryReportByEmployeeUUID: (uuid: string, query: string) => [
		...hrQK.all(),
		'employee-summary-report',
		uuid,
		'by',
		query,
	],

	//* employee history
	employeeHistory: () => [...hrQK.all(), 'employee-history'],
	employeeHistoryByUUID: (uuid: string) => [...hrQK.employeeHistory(), uuid],
	employeeHistoryByEmployeeUUID: (uuid: string) => [...hrQK.employeeHistory(), 'employee', uuid],

	//* employee education
	employeeEducation: () => [...hrQK.all(), 'employee-education'],
	employeeEducationByUUID: (uuid: string) => [...hrQK.employeeEducation(), uuid],
	employeeEducationByEmployeeUUID: (uuid: string) => [...hrQK.employeeEducation(), 'employee', uuid],

	//* employee address
	employeeAddress: () => [...hrQK.all(), 'employee-address'],
	employeeAddressByUUID: (uuid: string) => [...hrQK.employeeAddress(), uuid],
	employeeAddressByEmployeeUUID: (uuid: string) => [...hrQK.employeeAddress(), 'employee', uuid],

	//* employee document
	employeeDocuments: () => [...hrQK.all(), 'employee-document'],
	employeeDocumentsByUUID: (uuid: string) => [...hrQK.employeeDocuments(), uuid],
	employeeDocumentsByEmployeeUUID: (uuid: string) => [...hrQK.employeeDocuments(), 'employee', uuid],

	// * Device Permission
	devicePermission: (query?: string) => [...hrQK.all(), 'device-permission', query],
	devicePermissionByUUID: (uuid: string) => [...hrQK.devicePermission(), uuid],
	deviceAllocation: (uuid?: string) => [...hrQK.all(), 'allocation', uuid],

	//* Punch log
	punchLog: (query?: string) => [...hrQK.all(), 'punch-log', query],
	punchLogPerDayByEmployeeUUID: (uuid: string, query: string) => [
		...hrQK.punchLog(),
		'per-day',
		'by-employee',
		uuid,
		query,
	],
	punchLogByEmployeeUUID: (uuid: string) => [...hrQK.punchLog(), 'punch-log', 'by-employee', uuid],
	applyLeaveLog: (query?: string) => [...hrQK.punchLog(), 'apply-leave-log', query],
	manualEntryLog: (query?: string) => [...hrQK.punchLog(), 'manual-entry-log', query],
	punchLateByEmployeeUUID: (uuid: string) => [...hrQK.punchLog(), 'punch-late', 'by-employee', uuid],
	punchLateEntriesByEmployeeUUID: (uuid: string, query: string) => [
		...hrQK.punchLog(),
		'late-entries',
		'by-employee',
		uuid,
		query,
	],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: (query: string) => [...hrQK.userDefault(), 'users', query],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],
	userPassword: (uuid: string) => [...hrQK.userDefault(), 'password', uuid],

	//* field visit
	manualEntry: (type?: string) => [...hrQK.all(), 'manual-entry', type],
	manualEntry2: (pagination: IPaginationQuery) => [...hrQK.all(), 'manual-entry-2', ...Object.values(pagination)],
	manualEntryByUUID: (uuid: string) => [...hrQK.manualEntry(), uuid],
	manualEntryByEmployeeUUID: (uuid: string, type?: string) => [...hrQK.manualEntry(), 'by-employee', uuid, type],
	fieldVisitEmployeeInfoByUUID: (uuid: string, field_visit_uuid: string) => [
		...hrQK.manualEntry(),
		'employee-info',
		uuid,
		field_visit_uuid,
	],

	deviceList: () => [...hrQK.all(), 'device-list'],
	deviceListByUUID: (uuid: string) => [...hrQK.deviceList(), uuid],
	orderInfoByCustomer: (uuid: string) => [...hrQK.all(), 'order-info', 'customer', uuid],
};
