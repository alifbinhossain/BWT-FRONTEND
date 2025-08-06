import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

import { IFieldVisitEmployee } from '../../pages/hr/_config/types';

const Profile: React.FC<{ data: any; url: string; openInNewTab?: boolean }> = ({ data, url, openInNewTab = true }) => {
	return (
		<div className='flex w-full flex-col space-y-4'>
			{/* Profile Section */}
			<div className='flex items-center gap-3'>
				<Avatar className='size-12 border'>
					<AvatarImage src='/placeholder-user.jpg' alt='Employee' />
					<AvatarFallback className='text-primary'>
						{String(data.name)
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div className='flex-1'>
					<Link
						to={url}
						className={cn(
							'hover:text-info hover:decoration-info font-semibold  duration-300 text-sm',
							url !== null ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed'
						)}
						target={openInNewTab ? '_blank' : '_self'}
					>
						{data?.name}
					</Link>
					<p className='text-xs'>
						{data.designation_name}, {data.department_name}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
