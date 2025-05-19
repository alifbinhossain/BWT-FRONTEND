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
const WorkPlace = lazy(() => import('@/pages/hr/settings/workplace'));
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
				],
			},
		],
	},
];

export default HrRoutes;
