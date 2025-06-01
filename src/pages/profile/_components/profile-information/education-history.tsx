import { Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface EducationRecord {
	id: string;
	degree: string;
	institution: string;
	board: string;
	year: string;
	grade: string;
}

interface EducationHistoryProps {
	data: EducationRecord[];
}

export function EducationHistory({ data }: EducationHistoryProps) {
	return data.length === 0 ? (
		<div className='py-8 text-center text-gray-500'>
			No education records found. Click the Add button to add education history.
		</div>
	) : (
		<div className='space-y-6 px-4 py-4'>
			{data.map((record, index) => (
				<div key={record.id} className='rounded-lg border p-4'>
					<div className='mb-4 flex items-start justify-between'>
						<h3 className='font-semibold text-primary'>
							{index + 1}. {record.degree}
						</h3>
						<div className='flex gap-2'>
							<Button variant='outline' size='sm' className='border-accent text-accent'>
								<Edit className='mr-2 h-4 w-4' />
								Edit
							</Button>
							<Button variant='destructive' size='sm'>
								<Trash2 className='mr-2 h-4 w-4' />
								Delete
							</Button>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Institution</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>
								{record.institution}
							</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Board</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>{record.board}</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Year</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>{record.year}</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Grade</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>{record.grade}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
