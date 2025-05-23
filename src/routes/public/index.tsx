import CustomerOrderForm from '@/pages/customer';
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
		path: '/order/:uuid',
		element: <OrderInfoDetails />,
		page_name: 'work__order_info_details',
		hidden: true,
	},
	{
		name: 'Form',
		path: '/form',
		element: <CustomerOrderForm />,
		page_name: 'customer_order_form',
		hidden: true,
	},
];

export default publicRoutes;
