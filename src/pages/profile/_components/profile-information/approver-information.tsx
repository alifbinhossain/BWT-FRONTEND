import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { IEmployeeDetails } from '../../config/types';

interface ApproverInformationProps {
	data: IEmployeeDetails;
}

const ApproverInformation = ({ data }: ApproverInformationProps) => {
	const approvers = [
		{ role: 'First Leave Approver', name: data.first_leave_approver_name },
		{ role: 'Second Leave Approver', name: data.second_leave_approver_name },
		{ role: 'First Late Approver', name: data.first_late_approver_name },
		{ role: 'Second Late Approver', name: data.second_late_approver_name },
		{ role: 'First Manual Entry Approver', name: data.first_manual_entry_approver_name },
		{ role: 'Second Manual Entry Approver', name: data.second_manual_entry_approver_name },
	];
	return (
		<Table className='border-b'>
			<TableHeader>
				<TableRow className='h-8'>
					<TableHead className='font-semibold text-primary'>Approver Role</TableHead>
					<TableHead className='font-semibold text-primary'>Assigned Person</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{approvers.map((approver, index) => (
					<TableRow key={index} className='h-10 border-b'>
						<TableCell className='font-medium text-gray-700'>{approver.role}</TableCell>
						<TableCell className='text-primary'>
							{approver.name || <span className='italic text-gray-500'>Not Assigned</span>}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ApproverInformation;
