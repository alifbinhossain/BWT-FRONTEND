import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ManualEntry = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<Edit className='mr-1 size-4' />
			<span className='text-sm'>Manual Entry</span>
		</Button>
	);
};

export default ManualEntry;
