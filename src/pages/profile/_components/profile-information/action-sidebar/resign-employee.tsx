import { UserMinus } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ResignEmployee = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<UserMinus className='mr-1 size-4' />
			<span className='text-sm'>Resign Employee</span>
		</Button>
	);
};

export default ResignEmployee;
