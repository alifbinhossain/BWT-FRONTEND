import { useState } from 'react';

import {
	addressData,
	approverData,
	documentsData,
	educationData,
	employeeData,
	employmentData,
	personalContactData,
} from './_config/data';
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
import PersonalContactInfo from './personal-contact-info';
import { SidebarNavigation } from './sidebar-navigation';

const ProfileInformation = () => {
	const [currentTab, setCurrentTab] = useState(sidebarItems[0].label);

	const handleTabClick = (label: string) => {
		setCurrentTab(label);
	};

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
					{currentTab === 'General Information' && <GeneralInformation />}
					{currentTab === 'Approver Information' && <ApproverInformation data={approverData} />}
					{currentTab === 'Personal & Contact Info' && <PersonalContactInfo data={personalContactData} />}
					{currentTab === 'Address' && <AddressInformation data={addressData} />}
					{currentTab === 'Change Password' && <ChangePassword />}
					{currentTab === 'Employment History' && <EmploymentHistory data={employmentData} />}
					{currentTab === 'Education History' && <EducationHistory data={educationData} />}
					{currentTab === 'Employee Documents' && <EmployeeDocuments data={documentsData} />}
					{currentTab === 'Notification Settings' && <NotificationSettings />}
				</Content>
			</div>
			<ActionsSidebar />
		</div>
	);
};

export default ProfileInformation;
