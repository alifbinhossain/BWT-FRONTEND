import { UserX } from 'lucide-react';

import { Button } from '@/components/ui/button';

const EmployeeStatus = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<UserX className='mr-1 size-4' />
			<span className='text-sm'>
				Make Employee Status <span className='text-primary'>Active</span>
			</span>
		</Button>
	);
};

export default EmployeeStatus;
