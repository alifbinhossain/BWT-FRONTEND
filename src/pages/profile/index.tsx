import { useEffect } from 'react';
import { ProfileProvider } from '@/context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
	useEffect(() => {
		document.title = 'Profile';
	}, []);

	return (
		<ProfileProvider>
			{({ navigationItems, currentTab, handleTabClick }) => (
				<Tabs value={currentTab} className='flex h-full w-full flex-col overflow-hidden'>
					<TabsList className='h-12 w-full justify-start space-x-0 rounded-b-none rounded-t-md bg-primary p-1.5'>
						{navigationItems.map((item) => (
							<TabsTrigger
								onClick={() => handleTabClick(item.title)}
								key={item.title}
								value={item.title}
								className='h-full rounded-md bg-transparent text-sm font-medium text-white last:border-r-0 hover:bg-white/10 data-[state=active]:bg-accent data-[state=active]:text-white'
							>
								{item.title}
							</TabsTrigger>
						))}
					</TabsList>
					{navigationItems.map((item) => (
						<TabsContent
							key={item.title}
							value={item.title}
							className='mt-0 flex-1 overflow-hidden bg-white p-4'
						>
							{item.content}
						</TabsContent>
					))}
				</Tabs>
			)}
		</ProfileProvider>
	);
};

export default ProfilePage;
