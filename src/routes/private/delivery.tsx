import { lazy } from 'react';
import { IRoute } from '@/types';

const Vehicle = lazy(() => import('@/pages/delivery/vehicles'));
const Courier = lazy(() => import('@/pages/delivery/courier'));
const Challan = lazy(() => import('@/pages/delivery/challan'));
const ChallanAdd = lazy(() => import('@/pages/delivery/challan/add-or-update'));
const ChallanDetails = lazy(() => import('@/pages/delivery/challan/details'));

const DeliveryRoutes: IRoute[] = [
	{
		name: 'Delivery',
		children: [
			{
				name: 'Challan',
				path: '/delivery/challan',
				element: <Challan />,
				page_name: 'delivery__challan',
				actions: ['create', 'read', 'update', 'delete', 'click_delivery_complete'],
			},
			{
				name: 'Challan Add',
				path: '/delivery/challan/add',
				element: <ChallanAdd />,
				page_name: 'delivery__challan_add',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Challan Update',
				path: '/delivery/challan/update/:uuid',
				element: <ChallanAdd />,
				page_name: 'delivery__challan_update',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Challan Details',
				path: '/delivery/challan/details/:uuid',
				element: <ChallanDetails />,
				page_name: 'delivery__challan_details',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Library',
				children: [
					{
						name: 'Vehicle',
						path: '/delivery/vehicle',
						element: <Vehicle />,
						page_name: 'delivery__vehicle',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Courier',
						path: '/delivery/courier',
						element: <Courier />,
						page_name: 'delivery__courier',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
		],
	},
];

export default DeliveryRoutes;
