import { lazy } from 'react';
import { IRoute } from '@/types';

const MonthlyDetails = lazy(() => import('@/pages/payroll/monthly-details'));
const EmployeeDetails = lazy(() => import('@/pages/payroll/monthly-details/details'));
const Salary = lazy(() => import('@/pages/payroll/salary'));
const SalaryIncrement = lazy(() => import('@/pages/payroll/salary-increment'));

const PayrollRoutes: IRoute[] = [
	{
		name: 'Payroll',
		children: [
			{
				name: 'Monthly Details',
				path: '/payroll/monthly-details',
				element: <MonthlyDetails />,
				page_name: 'payroll__monthly_details',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Employee Details',
				path: '/payroll/monthly-employee-details/:uuid/:year/:month',
				element: <EmployeeDetails />,
				hidden: true,
				page_name: 'payroll__monthly_employee_details',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Salary',
				path: '/payroll/salary',
				element: <Salary />,
				page_name: 'payroll__salary',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Salary Increment',
				path: '/payroll/salary-increment',
				element: <SalaryIncrement />,
				page_name: 'payroll__salary_increment',
				actions: ['read', 'create', 'update', 'delete'],
			},
		],
	},
];

export default PayrollRoutes;
