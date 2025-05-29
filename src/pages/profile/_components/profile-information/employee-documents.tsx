import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Document {
	id: string;
	type: string;
	description: string;
	link: string;
}

interface EmployeeDocumentsProps {
	data: Document[];
}

export function EmployeeDocuments({ data }: EmployeeDocumentsProps) {
	return data.length === 0 ? (
		<div className='px-6 py-8 text-center text-gray-500'>
			No documents uploaded yet. Click the Add button to upload documents.
		</div>
	) : (
		<Table>
			<TableHeader>
				<TableRow className='bg-accent hover:bg-accent'>
					<TableHead className='font-semibold text-white'>Type</TableHead>
					<TableHead className='font-semibold text-white'>Description</TableHead>
					<TableHead className='font-semibold text-white'>Link</TableHead>
					<TableHead className='font-semibold text-white'>Remove</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((document) => (
					<TableRow key={document.id}>
						<TableCell className='font-medium'>{document.type}</TableCell>
						<TableCell>{document.description}</TableCell>
						<TableCell>
							<Button variant='link' className='h-auto p-0 text-accent'>
								<Download className='mr-2 h-4 w-4' />
								Download
							</Button>
						</TableCell>
						<TableCell>
							<Button variant='destructive' size='sm'>
								Remove
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
