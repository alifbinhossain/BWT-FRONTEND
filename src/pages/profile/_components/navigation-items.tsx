import AttendanceReport from './attendance-report';
import DevicePermission from './device-permission';
import EnrollEmployee from './enroll-employee';
import Leave from './leave';
import PendingApprovals from './pending-approvals';
import ProfileInformation from './profile-information';
import Roaster from './roaster';

export const navigationItems = [
	{
		title: 'Profile Information',
		content: <ProfileInformation />,
	},
	{
		title: 'Attendance Report',
		content: <AttendanceReport />,
	},
	{
		title: 'Leave',
		content: <Leave />,
	},
	{
		title: 'Enroll Employee',
		content: <EnrollEmployee />,
	},
	{
		title: 'Device Permissions',
		content: <DevicePermission />,
	},
	{
		title: 'Roaster',
		content: <Roaster />,
	},
	{
		title: 'Pending Approvals',
		content: <PendingApprovals />,
	},
] as const;
