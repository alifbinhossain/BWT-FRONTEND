import { Fingerprint } from 'lucide-react';

import { Button } from '@/components/ui/button';

const EnrolFingerprint = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<Fingerprint className='mr-1 size-4' />
			<span className='text-sm'>Enrol Fingerprint</span>
		</Button>
	);
};

export default EnrolFingerprint;
