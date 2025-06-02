import { RefreshCw } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

const SyncEmployee = () => {
	const { refetch } = useProfile();
	return (
		<Button onClick={refetch} variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<RefreshCw className='mr-1 size-4' />
			<span className='text-sm'>Sync Employee</span>
		</Button>
	);
};

export default SyncEmployee;
