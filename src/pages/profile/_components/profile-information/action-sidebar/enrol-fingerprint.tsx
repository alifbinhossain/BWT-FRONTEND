import { Fingerprint } from 'lucide-react';
import useProfile from '@/hooks/useProfile';

import { Button } from '@/components/ui/button';

const EnrolFingerprint = () => {
	const { handleTabClick } = useProfile();
	return (
		<Button
			onClick={() => handleTabClick('Enroll Employee')}
			variant={'outline'}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			<Fingerprint className='mr-1 size-4' />
			<span className='text-sm'>Enrol Fingerprint</span>
		</Button>
	);
};

export default EnrolFingerprint;
