import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SyncEmployee = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<RefreshCw className='mr-1 size-4' />
			<span className='text-sm'>Sync Employee</span>
		</Button>
	);
};

export default SyncEmployee;
