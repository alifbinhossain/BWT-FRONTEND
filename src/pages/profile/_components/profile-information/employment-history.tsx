import { Edit, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmploymentRecord {
	id: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description?: string;
}

interface EmploymentHistoryProps {
	data: EmploymentRecord[];
}

export function EmploymentHistory({ data }: EmploymentHistoryProps) {
	return data.length === 0 ? (
		<div className='py-12 text-center'>
			<p className='mb-4 italic text-gray-500'>No Employment History provided. Please click here to add one.</p>
			<Button variant='outline' className='border-accent text-accent hover:bg-accent/10'>
				<Plus className='mr-2 h-4 w-4' />
				Add Employment History
			</Button>
		</div>
	) : (
		<div className='space-y-4 px-4 py-4'>
			{data.map((record) => (
				<div key={record.id} className='rounded-lg border p-4'>
					<div className='mb-3 flex items-start justify-between'>
						<div>
							<h3 className='font-semibold text-primary'>{record.position}</h3>
							<p className='text-sm text-gray-600'>{record.company}</p>
							<p className='text-xs text-gray-500'>
								{record.startDate} - {record.endDate}
							</p>
						</div>
						<div className='flex gap-2'>
							<Button variant='outline' size='sm' className='border-accent text-accent'>
								<Edit className='h-4 w-4' />
							</Button>
							<Button variant='destructive' size='sm'>
								<Trash2 className='h-4 w-4' />
							</Button>
						</div>
					</div>
					{record.description && <p className='text-sm text-gray-700'>{record.description}</p>}
				</div>
			))}
		</div>
	);
}
