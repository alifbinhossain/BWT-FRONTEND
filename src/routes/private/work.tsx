import { lazy } from 'react';
import Diagnosis from '@/pages/work/diagonsis';
import Job from '@/pages/work/order';
import Problem from '@/pages/work/problem';
import Section from '@/pages/work/section';
import { IRoute } from '@/types';

const workRoutes: IRoute[] = [
	{
		name: 'Work',
		children: [
			{
				name: 'Order',
				path: '/work/order',
				element: <Job />,
				page_name: 'work__order',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Diagnosis',
				path: '/work/diagnosis',
				element: <Diagnosis />,
				page_name: 'work__diagnosis',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Library',
				children: [
					{
						name: 'Problem',
						path: '/work/problem',
						element: <Problem />,
						page_name: 'work__problem',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Section',
						path: '/work/section',
						element: <Section />,
						page_name: 'work__section',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
		],
	},
];
export default workRoutes;
