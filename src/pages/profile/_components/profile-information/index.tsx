import { useState } from 'react';
import { useHrEmployeesByUUID } from '@/pages/hr/_config/query';
import useAuth from '@/hooks/useAuth';

import { IEmployeeDetails } from '../../config/types';
import { documentsData } from './_config/data';
import { sidebarItems } from './_config/sidebar-items';
import { ActionsSidebar } from './action-sidebar';
import { AddressInformation } from './address-information';
import ApproverInformation from './approver-information';
import { ChangePassword } from './change-password';
import Content from './content';
import { EducationHistory } from './education-history';
import { EmployeeDocuments } from './employee-documents';
import { EmploymentHistory } from './employment-history';
import { GeneralInformation } from './general-information';
import { NotificationSettings } from './notification-settings';
import { PersonalContactInfo } from './personal-contact-info';
import { SidebarNavigation } from './sidebar-navigation';

const ProfileInformation = () => {
	const [currentTab, setCurrentTab] = useState(sidebarItems[0].label);

	const handleTabClick = (label: string) => {
		setCurrentTab(label);
	};
	const { user } = useAuth();
	const { data, updateData, isLoading } = useHrEmployeesByUUID<IEmployeeDetails>(user?.employee_uuid as string);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='grid h-full grid-cols-5 gap-4'>
			<div className='col-span-4 flex h-full gap-4 overflow-hidden'>
				<SidebarNavigation
					sidebarItems={sidebarItems}
					currentTab={currentTab}
					handleTabClick={handleTabClick}
					employeeName='John Doe'
				/>
				<Content title={currentTab}>
					{currentTab === 'General Information' && (
						<GeneralInformation data={data!} updateData={updateData} />
					)}
					{currentTab === 'Approver Information' && <ApproverInformation data={data!} />}
					{currentTab === 'Personal & Contact Info' && (
						<PersonalContactInfo data={data!} updateData={updateData} />
					)}
					{currentTab === 'Address' && <AddressInformation employee_id={data!.uuid} />}
					{currentTab === 'Change Password' && <ChangePassword />}
					{currentTab === 'Employment History' && <EmploymentHistory employee_id={data!.uuid} />}
					{currentTab === 'Education History' && <EducationHistory employee_id={data!.uuid} />}
					{currentTab === 'Employee Documents' && <EmployeeDocuments data={documentsData} />}
					{currentTab === 'Notification Settings' && <NotificationSettings />}
				</Content>
			</div>
			<ActionsSidebar />
		</div>
	);
};

export default ProfileInformation;
