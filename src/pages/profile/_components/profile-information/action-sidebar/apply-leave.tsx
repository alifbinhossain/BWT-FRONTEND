import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ApplyForLeave = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<Calendar className='mr-1 size-4' />
			<span className='text-sm'>Apply for Leave</span>
		</Button>
	);
};

export default ApplyForLeave;
