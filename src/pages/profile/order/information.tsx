import React from 'react';
import { Calendar, Clock, Phone, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { formatDateTable } from '@/utils/formatDate';

import { IInfoTableData } from '../config/columns/columns.type';

const Information: React.FC<{ data: IInfoTableData }> = ({ data }) => {
	let currentStatus = '';
	if (!data?.order_entry.some((item) => !item.is_delivery_complete)) {
		currentStatus = 'Delivered';
	} else if (data?.is_product_received) {
		currentStatus = 'Product Received';
	} else {
		currentStatus = 'Order Received';
	}
	return (
		<Card className='w-full overflow-hidden border-slate-200 shadow-sm'>
			<div className='bg-gradient-to-r from-slate-800 to-slate-700 p-4 text-white'>
				<div className='mb-1 flex items-center justify-between'>
					<h3 className='font-medium capitalize'>
						{data.user_name} - {data.info_id}
					</h3>
					<Badge variant={'accent'}>{currentStatus}</Badge>
				</div>
			</div>

			<div className='space-y-4 p-5'>
				<div className='group flex items-center gap-3 text-sm'>
					<div className='flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100'>
						<User className='size-4 text-slate-500' />
					</div>
					<div className='flex w-full items-center justify-between'>
						<span className='text-slate-600'>User ID:</span>
						<span className='font-medium'>{data.user_id}</span>
					</div>
				</div>

				<div className='flex items-center gap-3 text-sm'>
					<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100'>
						<Phone className='size-4 text-slate-500' />
					</div>
					<div className='flex w-full items-center justify-between'>
						<span className='text-slate-600'>Phone Number:</span>
						<span className='font-medium'>{data.user_phone}</span>
					</div>
				</div>

				<Separator className='my-1' />

				<div className='flex items-center gap-3 text-sm'>
					<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100'>
						<Calendar className='size-4 text-slate-500' />
					</div>
					<div className='flex w-full items-center justify-between'>
						<span className='text-slate-600'>Received Date:</span>
						<span className='font-medium'>
							{data.received_date ? formatDateTable(data.received_date) : '--'}
						</span>
					</div>
				</div>

				<div className='flex items-center gap-3 text-sm'>
					<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100'>
						<Calendar className='size-4 text-slate-500' />
					</div>
					<div className='flex w-full items-center justify-between'>
						<span className='text-slate-600'>Created At:</span>
						<span className='font-medium'>{data.created_at ? formatDateTable(data.created_at) : '--'}</span>
					</div>
				</div>

				<div className='flex items-center gap-3 text-sm'>
					<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100'>
						<Clock className='size-4 text-slate-500' />
					</div>
					<div className='flex w-full items-center justify-between'>
						<span className='text-slate-600'>Updated At:</span>
						<span className='font-medium'>{data.updated_at ? formatDateTable(data.updated_at) : '--'}</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Information;
