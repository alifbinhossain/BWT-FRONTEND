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
const WorkPlace = lazy(() => import('@/pages/hr/settings/workplace'));

const FieldVisit = lazy(() => import('@/pages/hr/field-visit'));
const FieldVisitAddOrUpdate = lazy(() => import('@/pages/hr/field-visit/add-or-update'));
const FieldVisitDetails = lazy(() => import('@/pages/hr/field-visit/details'));

const ManualEntry = lazy(() => import('@/pages/hr/manual-entry'));

const DeviceList = lazy(() => import('@/pages/hr/device-list'));

const PunchLog = lazy(() => import('@/pages/hr/punch-log'));
const Log = lazy(() => import('@/pages/hr/Log'));

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
				name: 'Field Visit Details',
				path: '/hr/field-visit/:uuid/details',
				element: <FieldVisitDetails />,
				page_name: 'admin__field_visit_details',
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
				name: 'Leave',
				children: [
					{
						name: 'Leave Policy',
						path: '/hr/leave-policy',
						element: <LeavePolicy />,
						page_name: 'admin__leave_policy',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Leave Categories',
						path: '/hr/leave-categories',
						element: <LeaveCategory />,
						page_name: 'admin__leave_categories',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Leave Configuration',
						path: '/hr/leave-configuration',
						element: <LeaveConfiguration />,
						page_name: 'admin__leave_configuration',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Leave Configuration Entry',
						path: '/hr/leave-configuration/entry',
						element: <LeaveConfigurationEntry />,
						hidden: true,
						page_name: 'admin__leave_configuration_entry',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Leave Configuration Update',
						path: '/hr/leave-configuration/:uuid/update',
						element: <LeaveConfigurationEntry />,
						hidden: true,
						page_name: 'admin__leave_configuration_update',
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
				name: 'Punch Log',
				path: '/hr/punch-log',
				element: <PunchLog />,
				page_name: 'admin__punch_log',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Log',
				path: '/hr/log',
				element: <Log />,
				page_name: 'admin__log',
				actions: ['create', 'read', 'update', 'delete'],
			},
			
		],
	},
];

export default HrRoutes;
