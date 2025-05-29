import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface AddressData {
	type: string;
	address: string;
	thana: string;
	district: string;
}

interface AddressInformationProps {
	data: AddressData[];
}

export function AddressInformation({ data }: AddressInformationProps) {
	return data.length === 0 ? (
		<div className='py-8 text-center text-gray-500'>
			No addresses added yet. Click the Add button to add an address.
		</div>
	) : (
		<div className='space-y-6 px-4 py-4'>
			{data.map((address, index) => (
				<div key={index} className='relative rounded-lg border p-4'>
					<div className='mb-4 flex items-start justify-between'>
						<h3 className='font-medium text-primary'>{address.type}</h3>
						<Button variant='destructive' size='sm'>
							<Trash2 className='mr-2 h-4 w-4' />
							Delete
						</Button>
					</div>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Address</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>
								{address.address}
							</div>
						</div>
						<div className='space-y-2'>
							<Label className='text-sm font-medium text-gray-600'>Thana</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>{address.thana}</div>
						</div>
						<div className='space-y-2 md:col-span-2'>
							<Label className='text-sm font-medium text-gray-600'>District</Label>
							<div className='rounded-md border bg-gray-50 p-3 text-sm text-primary'>
								{address.district}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
