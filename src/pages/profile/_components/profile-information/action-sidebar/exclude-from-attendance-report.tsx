import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ExcludeFromAttendanceReport = () => {
	return (
		<Button variant={'outline'} className={`h-auto w-full justify-start px-4 py-2`}>
			<AlertTriangle className='mr-1 size-4' />
			<span className='text-sm'>Exclude from Attendance Report</span>
		</Button>
	);
};

export default ExcludeFromAttendanceReport;
