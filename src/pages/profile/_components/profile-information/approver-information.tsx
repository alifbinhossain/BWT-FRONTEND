import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ApproverData {
	firstLeaveApprover: string;
	secondLeaveApprover: string;
	firstLateApprover: string;
	secondLateApprover: string;
	firstManualEntryApprover: string;
	secondManualEntryApprover: string;
}

interface ApproverInformationProps {
	data: ApproverData;
}

const ApproverInformation = ({ data }: ApproverInformationProps) => {
	const approvers = [
		{ role: 'First Leave Approver', name: data.firstLeaveApprover },
		{ role: 'Second Leave Approver', name: data.secondLeaveApprover },
		{ role: 'First Late Approver', name: data.firstLateApprover },
		{ role: 'Second Late Approver', name: data.secondLateApprover },
		{ role: 'First Manual Entry Approver', name: data.firstManualEntryApprover },
		{ role: 'Second Manual Entry Approver', name: data.secondManualEntryApprover },
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
