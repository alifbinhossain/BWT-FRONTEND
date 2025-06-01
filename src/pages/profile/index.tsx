import React, { useEffect } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AttendanceReport from './_components/attendance-report';
import DevicePermission from './_components/device-permission';
import EnrollEmployee from './_components/enroll-employee';
import Leave from './_components/leave';
import PendingApprovals from './_components/pending-approvals';
import ProfileInformation from './_components/profile-information';
import Roaster from './_components/roaster';

interface INavigationTabsProps {
	title: string;
	content: React.ReactNode;
}

const navigationItems: INavigationTabsProps[] = [
	{
		title: 'Profile Information',
		content: <ProfileInformation />,
	},
	{
		title: 'Attendance Report',
		content: <AttendanceReport />,
	},
	{
		title: 'Leave',
		content: <Leave />,
	},
	{
		title: 'Enroll Employee',
		content: <EnrollEmployee />,
	},
	{
		title: 'Device Permissions',
		content: <DevicePermission />,
	},
	{
		title: 'Roaster',
		content: <Roaster />,
	},
	{
		title: 'Pending Approvals',
		content: <PendingApprovals />,
	},
];

const ProfilePage = () => {
	useEffect(() => {
		document.title = 'Profile';
	}, []);

	return (
		<Tabs defaultValue='Profile Information' className='flex h-full w-full flex-col overflow-hidden'>
			<TabsList className='h-12 w-full justify-start space-x-0 rounded-b-none rounded-t-md bg-primary p-1.5'>
				{navigationItems.map((item) => (
					<TabsTrigger
						key={item.title}
						value={item.title}
						className='h-full rounded-md bg-transparent text-sm font-medium text-white last:border-r-0 hover:bg-white/10 data-[state=active]:bg-accent data-[state=active]:text-white'
					>
						{item.title}
					</TabsTrigger>
				))}
			</TabsList>
			{navigationItems.map((item) => (
				<TabsContent key={item.title} value={item.title} className='mt-0 flex-1 overflow-hidden bg-white p-4'>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export default ProfilePage;
