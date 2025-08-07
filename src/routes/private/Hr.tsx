import { lazy } from 'react';
import { IRoute } from '@/types';

const Employee = lazy(() => import('@/pages/hr/employee'));
const Designation = lazy(() => import('@/pages/hr/settings/designation'));
const Department = lazy(() => import('@/pages/hr/settings/department'));
const EmployeeType = lazy(() => import('@/pages/hr/settings/employee-types'));
const Holiday = lazy(() => import('@/pages/hr/settings/holidays'));
const SpecialDays = lazy(() => import('@/pages/hr/settings/specials-days'));
const SubDepartment = lazy(() => import('@/pages/hr/settings/sub-departments'));
const LeavePolicy = lazy(() => import('@/pages/hr/leave/policy'));
const LeaveCategory = lazy(() => import('@/pages/hr/leave/categories'));
const LeaveConfiguration = lazy(() => import('@/pages/hr/leave/configuration'));
const LeaveConfigurationEntry = lazy(() => import('@/pages/hr/leave/configuration/add-or-update'));
const LeaveApplyLeave = lazy(() => import('@/pages/hr/leave/apply-leave/'));
const LeaveApplyLeaveEntry = lazy(() => import('@/pages/hr/leave/apply-leave/add-or-update'));
const WorkPlace = lazy(() => import('@/pages/hr/settings/workplace'));
const FieldVisit = lazy(() => import('@/pages/hr/field-visit'));
const FieldVisitAddOrUpdate = lazy(() => import('@/pages/hr/field-visit/add-or-update'));
const ManualEntry = lazy(() => import('@/pages/hr/manual-entry'));
const DeviceList = lazy(() => import('@/pages/hr/device-list'));
const DeviceAllocate = lazy(() => import('@/pages/hr/device-list/allocate'));
const PunchLog = lazy(() => import('@/pages/hr/punch-log'));
const PendingApproval = lazy(() => import('@/pages/hr/pending-approval'));
const Shift = lazy(() => import('@/pages/hr/shifts-management/shifts'));
const ShiftsGroups = lazy(() => import('@/pages/hr/shifts-management/shifts-groups'));
const Roasters = lazy(() => import('@/pages/hr/shifts-management/roasters'));
const IndividualReport = lazy(() => import('@/pages/hr/report/individual-report'));
const DepartmentReport = lazy(() => import('@/pages/hr/report/department-report'));
const LeaveHistory = lazy(() => import('@/pages/hr/report/leave/history'));
const LeaveBalance = lazy(() => import('@/pages/hr/report/leave/balance'));
const AbsentSummery = lazy(() => import('@/pages/hr/report/absent/summery'));
const DailyAbsent = lazy(() => import('@/pages/hr/report/absent/daily'));
const LateReport = lazy(() => import('@/pages/hr/report/late'));
const MonthlyReport = lazy(() => import('@/pages/hr/report/monthly-report'));
const DailyReport = lazy(() => import('@/pages/hr/report/daily-report'));
const DailyLate = lazy(() => import('@/pages/hr/report/daily-late'));
const DetailedReport = lazy(() => import('@/pages/hr/report/detailed-report'));


const HrRoutes: IRoute[] = [
	{
		name: 'HR',
		children: [
			{
				name: 'Employee',
				path: '/hr/employee',
				element: <Employee />,
				page_name: 'admin__employee',
				actions: [
					'create',
					'read',
					'update',
					'delete',
					'click_status',
					'click_reset_password',
					'click_page_assign',
					'click_rating_change',
				],
			},

			{
				name: 'Manual Entry',
				path: '/hr/manual-entry',
				element: <ManualEntry />,
				page_name: 'admin__manual_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},

			{
				name: 'Field Visit',
				path: '/hr/field-visit',
				element: <FieldVisit />,
				page_name: 'admin__field_visit',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Field Visit Add',
				path: '/hr/field-visit/add',
				element: <FieldVisitAddOrUpdate />,
				page_name: 'admin__field_visit_add',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Field Visit Update',
				path: '/hr/field-visit/:uuid/update',
				element: <FieldVisitAddOrUpdate />,
				page_name: 'admin__field_visit_update',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Settings',
				children: [
					{
						name: 'Designation',
						path: '/hr/designation',
						element: <Designation />,
						page_name: 'admin__user_designation',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Employee Type',
						path: '/hr/employee-type',
						element: <EmployeeType />,
						page_name: 'admin__employee_type',
						actions: ['create', 'read', 'update', 'delete', 'click_status'],
					},
					{
						name: 'Department',
						path: '/hr/department',
						element: <Department />,
						page_name: 'admin__user_department',
						actions: ['create', 'read', 'update', 'delete', 'click_status'],
					},
					{
						name: 'Sub-Department',
						path: '/hr/sub-department',
						element: <SubDepartment />,
						page_name: 'admin__sub_department',
						actions: ['create', 'read', 'update', 'delete', 'click_status'],
					},
					{
						name: 'Workplace',
						path: '/hr/workplace',
						element: <WorkPlace />,
						page_name: 'admin__workplace',
						actions: ['create', 'read', 'update', 'delete', 'click_status'],
					},
					{
						name: 'Holidays',
						path: '/hr/holidays',
						element: <Holiday />,
						page_name: 'admin__holiday',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Special Holidays',
						path: '/hr/special-holidays',
						element: <SpecialDays />,
						page_name: 'admin__special_holiday',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
			{
				name: 'Shift Management',
				children: [
					{
						name: 'Shifts',
						path: '/hr/shifts',
						element: <Shift />,
						page_name: 'admin__shifts',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Shifts Groups',
						path: '/hr/shifts-groups',
						element: <ShiftsGroups />,
						page_name: 'admin__shifts_groups',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Roasters',
						path: '/hr/roasters',
						element: <Roasters />,
						page_name: 'admin__shifts_roasters',
						actions: ['read', 'update', 'delete'],
					},
				],
			},
			{
				name: 'Leave',
				children: [
					{
						name: 'Policy',
						path: '/hr/leave-policy',
						element: <LeavePolicy />,
						page_name: 'admin__leave_policy',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Categories',
						path: '/hr/leave-categories',
						element: <LeaveCategory />,
						page_name: 'admin__leave_categories',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Configuration',
						path: '/hr/leave-configuration',
						element: <LeaveConfiguration />,
						page_name: 'admin__leave_configuration',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Configuration Entry',
						path: '/hr/leave-configuration/entry',
						element: <LeaveConfigurationEntry />,
						hidden: true,
						page_name: 'admin__leave_configuration_entry',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Configuration Update',
						path: '/hr/leave-configuration/:uuid/update',
						element: <LeaveConfigurationEntry />,
						hidden: true,
						page_name: 'admin__leave_configuration_update',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Apply',
						path: '/hr/apply-leave',
						element: <LeaveApplyLeave />,
						page_name: 'admin__leave_apply_leave',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Apply',
						path: '/hr/apply-leave/add',
						element: <LeaveApplyLeaveEntry />,
						hidden: true,
						page_name: 'admin__leave_apply_leave_entry',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Apply Update',
						path: '/hr/apply-leave/:uuid/update',
						element: <LeaveApplyLeaveEntry />,
						hidden: true,
						page_name: 'admin__leave_apply_leave_update',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},

			{
				name: 'Device List',
				path: '/hr/device-list',
				element: <DeviceList />,
				page_name: 'admin__device_list',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Device Allocate',
				path: '/hr/device-allocate/:uuid',
				element: <DeviceAllocate />,
				page_name: 'admin__device_allocate',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Punch Log',
				path: '/hr/punch-log',
				element: <PunchLog />,
				page_name: 'admin__punch_log',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Pending Approval',
				path: '/hr/pending-approval',
				element: <PendingApproval />,
				page_name: 'admin__pending_approval',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Attendance Report',
						children: [
							{
								name: 'Individual Report',
								path: '/hr/report/individual',
								element: <IndividualReport />,
								page_name: 'report__individual_report',
								actions: ['read'],
							},
							{
								name: 'Department Report',
								path: '/hr/report/department',
								element: <DepartmentReport />,
								page_name: 'report__department_report',
								actions: ['read'],
							},
							{
								name: 'Monthly Report',
								path: '/hr/report/monthly',
								element: <MonthlyReport />,
								page_name: 'report__monthly_report',
								actions: ['read'],
							},
							{
								name: 'Daily Report',
								path: '/hr/report/daily',
								element: <DailyReport />,
								page_name: 'report__daily_report',
								actions: ['read'],
							},
							{
								name: 'Detailed Report',
								path: '/hr/report/detailed',
								element: <DetailedReport />,
								page_name: 'report__detailed_report',
								actions: ['read'],
							}
						],
					},
					{
						name: 'Leave Report',
						children: [
							{
								name: 'History',
								path: '/hr/report/leave/history',
								element: <LeaveHistory />,
								page_name: 'report__leave_history',
								actions: ['read'],
							},
							{
								name: 'Balance',
								path: '/hr/report/leave/balance',
								element: <LeaveBalance />,
								page_name: 'report__leave_balance',
								actions: ['read'],
							},
						],
					},
					{
						name: 'Absent',
						children: [
							{
								name: 'Daily Absent',
								path: '/hr/report/absent/daily',
								element: <DailyAbsent />,
								page_name: 'report__absent_daily',
								actions: ['read'],
							},
							{
								name: 'Summery',
								path: '/hr/report/absent/summery',
								element: <AbsentSummery />,
								page_name: 'report__absent_summery',
								actions: ['read'],
							},
						],
					},
					{
						name: 'Late Report',
						path: '/hr/report/late',
						element: <LateReport />,
						page_name: 'report__late',
						actions: ['read'],
					},
					{
						name: 'Daily Late',
						path: '/hr/report/daily-late',
						element: <DailyLate />,
						page_name: 'report__daily_late',
						actions: ['read'],
					},
				],
			},
		],
	},
];

export default HrRoutes;
