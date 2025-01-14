import { lazy } from 'react';
import { IRoute } from '@/types';

const CommercialBank = lazy(() => import('@/pages/commercial/bank'));

const CommercialRoutes: IRoute[] = [
	{
		name: 'Commercial',
		children: [
			{
				name: 'Bank',
				path: '/commercial/bank',
				element: <CommercialBank />,
				page_name: 'commercial__bank',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default CommercialRoutes;
