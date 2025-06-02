import Profile from '@/pages/profile';
import { IRoute } from '@/types';

const ProfileRoutes: IRoute[] = [
	{
		name: 'Profile',
		path: '/profile/',
		element: <Profile />,
		page_name: 'profile',
		actions: ['read'],
	},
	{
		name: 'Profile',
		path: '/profile/:uuid',
		element: <Profile />,
		page_name: 'profile',
		actions: ['read'],
		hidden: true,
	},
];
export default ProfileRoutes;
