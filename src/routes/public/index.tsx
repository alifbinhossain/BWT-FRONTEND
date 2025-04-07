import OrderInfoDetails from '@/pages/profile/order';
import Login from '@/pages/public/login';
import NotFound from '@/pages/public/not-found';

const publicRoutes = [
	{
		path: '/login',
		element: <Login />,
	},
	// {
	// 	path: '/no-access',
	// 	element: <NoAccess />,
	// },
	{
		path: '/not-found',
		element: <NotFound />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		name: 'Info Details',
		path: '/work/order/:uuid',
		element: <OrderInfoDetails />,
		page_name: 'work__order_info_details',
		hidden: true,
	},
];

export default publicRoutes;
