import { lazy } from 'react';
import { Diagnosis } from '@/pages/work/diagnosis';
import { Job } from '@/pages/work/job';
import { Problem } from '@/pages/work/library/problem';
import { Section } from '@/pages/work/library/section';
import { Process } from '@/pages/work/process';
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
				name: 'Diagnosis',
				path: '/work/diagnosis',
				element: <Diagnosis />,
				page_name: 'work__diagnosis',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Process',
				path: '/work/process',
				element: <Process />,
				page_name: 'work__process',
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
