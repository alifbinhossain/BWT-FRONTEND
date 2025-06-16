import useProfile from '@/hooks/useProfile';

import FieldVisit from './field-visit';
import ManualEntry from './manual-entry';
import WorkHoursChart from './work-hours-chart';

const AttendanceReport = () => {
	const { profileData, isLoading } = useProfile();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='h-full space-y-6 overflow-auto'>
			<WorkHoursChart />
			<FieldVisit employeeId={profileData?.uuid as string} />
			<ManualEntry employeeId={profileData?.uuid as string} />
		</div>
	);
};

export default AttendanceReport;
