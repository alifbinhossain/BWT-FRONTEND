import React from 'react';

import { Label } from '@/components/ui/label';

interface PersonalContactData {
	fatherName: string;
	motherName: string;
	bloodGroup: string;
	dateOfBirth: string;
	nationalId: string;
	officePhone: string;
	homePhone: string;
	personalPhone: string;
}

interface PersonalContactInfoProps {
	data: PersonalContactData;
}

const PersonalContactInfo: React.FC<PersonalContactInfoProps> = ({ data }) => {
	const fields = [
		{ label: "Father's Name", value: data.fatherName },
		{ label: "Mother's Name", value: data.motherName },
		{ label: 'Blood Group', value: data.bloodGroup },
		{ label: 'Date of Birth', value: data.dateOfBirth },
		{ label: 'National ID', value: data.nationalId },
		{ label: 'Office Phone', value: data.officePhone },
		{ label: 'Home Phone', value: data.homePhone },
		{ label: 'Personal Phone', value: data.personalPhone },
	];
	return (
		<div className='grid grid-cols-1 gap-6 px-4 py-2 md:grid-cols-2'>
			{fields.map((field) => (
				<div key={field.label} className='space-y-2'>
					<Label className='text-sm font-medium text-gray-600'>{field.label}</Label>
					<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>
						{field.value || 'Not Set'}
					</div>
				</div>
			))}
		</div>
	);
};

export default PersonalContactInfo;
