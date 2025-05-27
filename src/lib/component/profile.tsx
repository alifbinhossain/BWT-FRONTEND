import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { IFieldVisitEmployee } from '../../pages/hr/_config/types';

const EmployeeProfile: React.FC<{ data: any }> = ({ data }) => {
	return (
		<div className='flex flex-col space-y-4'>
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
				<div>
					<h2 className='text-lg font-medium'>{data.name}</h2>
					<p className='text-sm text-muted-foreground'>
						{data.designation_name}, {data.department_name}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmployeeProfile;
