import useProfile from '@/hooks/useProfile';

import WorkHoursChart from './work-hours-chart';

const AttendanceReport = () => {
	const { profileData } = useProfile();
	return (
		<div className='h-full overflow-auto'>
			<WorkHoursChart />
		</div>
	);
};

export default AttendanceReport;
