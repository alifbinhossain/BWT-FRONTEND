import { lazy } from 'react';
import { IRoute } from '@/types';

const Group = lazy(() => import('@/pages/store/group'));
const Category = lazy(() => import('@/pages/store/category'));
const Brand = lazy(() => import('@/pages/store/brand'));
const Size = lazy(() => import('@/pages/store/size'));
const Vendor = lazy(() => import('@/pages/store/vendor'));
const Product = lazy(() => import('@/pages/store/product'));
const Stock = lazy(() => import('@/pages/store/stock'));
const Branch = lazy(() => import('@/pages/store/branch'));
const Warehouse = lazy(() => import('@/pages/store/warehouse'));
const Room = lazy(() => import('@/pages/store/room'));
const Rack = lazy(() => import('@/pages/store/rack'));
const Floor = lazy(() => import('@/pages/store/floor'));
const Box = lazy(() => import('@/pages/store/box'));

const StoreRoutes: IRoute[] = [
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
			{
				name: 'Category',
				path: '/store/category',
				element: <Category />,
				page_name: 'store__category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Brand',
				path: '/store/brand',
				element: <Brand />,
				page_name: 'store__brand',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Size',
				path: '/store/size',
				element: <Size />,
				page_name: 'store__size',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Vendor',
				path: '/store/vendor',
				element: <Vendor />,
				page_name: 'store__vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Product',
				path: '/store/product',
				element: <Product />,
				page_name: 'store__product',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Stock',
				path: '/store/stock',
				element: <Stock />,
				page_name: 'store__stock',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Branch',
				path: '/store/branch',
				element: <Branch />,
				page_name: 'store__branch',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Warehouse',
				path: '/store/warehouse',
				element: <Warehouse />,
				page_name: 'store__warehouse',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Room',
				path: '/store/room',
				element: <Room />,
				page_name: 'store__room',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Rack',
				path: '/store/rack',
				element: <Rack />,
				page_name: 'store__rack',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Floor',
				path: '/store/floor',
				element: <Floor />,
				page_name: 'store__floor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Box',
				path: '/store/box',
				element: <Box />,
				page_name: 'store__box',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default StoreRoutes;
