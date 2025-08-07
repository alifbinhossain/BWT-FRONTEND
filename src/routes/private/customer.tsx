import { lazy } from 'react';
import { IRoute } from '@/types';

const CustomerProfile = lazy(() => import('@/pages/customer/profile'));
const CustomerRoutes: IRoute[] = [
	{
		name: 'Customer Profile',
		path: '/customer',
		element: <CustomerProfile />,
		page_name: 'customer__customer_profile',
		actions: ['read', 'create', 'update', 'delete'],
	},
];

export default CustomerRoutes;
