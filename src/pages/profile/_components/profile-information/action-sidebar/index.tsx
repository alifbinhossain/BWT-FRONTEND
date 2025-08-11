import useProfile from '@/hooks/useProfile';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ALlowOvertime from './allow-overtime';
import ApplyForLateApproval from './apply-for-late-approval';
import ApplyForLeave from './apply-leave';
import DeleteEmployee from './delete-employee';
import EmployeeStatus from './employee-status';
import EnrolFingerprint from './enrol-fingerprint';
import ExcludeFromAttendanceReport from './exclude-from-attendance-report';
import HrManager from './hr-manager';
import LineManager from './line-manager';
import ManualEntry from './manual-entry';
import ResignEmployee from './resign-employee';
import SyncEmployee from './sync-employee';

export function ActionsSidebar(data: any) {
	// const { profileData } = useProfile();

	return (
		<Card className='flex h-full w-full flex-col overflow-hidden'>
			<CardHeader className='border-b border-gray-200 py-2'>
				<CardTitle className='text-[16px] font-semibold text-accent'>Actions</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-1 flex-col gap-2 overflow-auto p-2'>
				{data.data?.status === true && data?.data?.is_resign === false && (
					<>
						<ApplyForLeave />
						<ApplyForLateApproval />
						<ManualEntry />
						<EnrolFingerprint />
						<HrManager />
						<LineManager />
						<ALlowOvertime />
						<ExcludeFromAttendanceReport />
					</>
				)}
				{data?.data?.is_resign === false && <EmployeeStatus data={data?.data} />}
				<ResignEmployee data={data?.data} />
				<DeleteEmployee data={data?.data} />
				{/* {data?.status === true && <SyncEmployee data={data} />} */}
			</CardContent>
		</Card>
	);
}
