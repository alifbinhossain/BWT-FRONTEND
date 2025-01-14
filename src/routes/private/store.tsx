import { lazy } from 'react';
import { IRoute } from '@/types';

const Group = lazy(() => import('@/pages/store/group'));

const IssueRoutes: IRoute[] = [
	{
		name: 'Store',
		children: [
			{
				name: 'Group',
				path: '/store/group',
				element: <Group />,
				page_name: 'store__group',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default IssueRoutes;
