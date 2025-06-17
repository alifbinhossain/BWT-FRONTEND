import { File } from 'lucide-react';
import useSidebar from '@/hooks/useSidebar';

import SidebarItem from './item';

const SidebarMenu = () => {
	const { routes } = useSidebar();

	if (!routes || routes.length === 0)
		return (
			<div className='h-full flex-1 space-y-1 overflow-auto px-4'>
				<p className='mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-white'>
					<File className='size-4' />
					No pages found.
				</p>
			</div>
		);
	return (
		<ul className='h-full flex-1 space-y-1 overflow-auto px-4'>
			{routes.map((item: any, index: number) => {
				return <SidebarItem key={index} {...item} />;
			})}
		</ul>
	);
};

export default SidebarMenu;
