import { Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ApplyForLateApproval = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<Clock className='mr-1 size-4' />
			<span className='text-sm'>Apply for Late Approval</span>
		</Button>
	);
};

export default ApplyForLateApproval;
