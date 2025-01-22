import { lazy } from 'react';
import Job from '@/pages/work/job';
import Problem from '@/pages/work/library/problem';
import Section from '@/pages/work/library/section';
import { IRoute } from '@/types';

const workRoutes: IRoute[] = [
	{
		name: 'Work',
		children: [
			{
				name: 'Job',
				path: '/work/job',
				element: <Job />,
				page_name: 'work__job',
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
