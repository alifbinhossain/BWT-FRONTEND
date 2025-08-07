import React from 'react';
import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';

import StatusLabel from '@/components/buttons/status-label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { formatDateTable } from '@/utils/formatDate';

interface IItemProps {
	label: string;
	value: string | number | React.ReactNode;
}

const Item: React.FC<IItemProps> = ({ label, value }) => {
	return (
		<div className='capitalize'>
			<span className='mb-0.5 block text-slate-500'>{label}</span>
			{typeof value === 'string' || typeof value === 'number' ? <span>{value || '--'}</span> : value}
		</div>
	);
};

const OrderCard: React.FC<{ data: IOrderTableData }> = ({ data }) => {
	const items: IItemProps[] = [
		{
			label: 'Brand',
			value: data.brand_name,
		},
		{
			label: 'Model',
			value: data.model_name,
		},
		{
			label: 'Size',
			value: data.size_name,
		},
		{
			label: 'Serial',
			value: data.serial_no,
		},

		{
			label: 'Quantity',
			value: data.quantity + ' pcs',
		},

		{
			label: 'Accessories Given',
			value: data.accessories_name?.join(', ').replace(/_/g, ' '),
		},

		{
			label: 'Created At',
			value: formatDateTable(data.created_at),
		},
		{
			label: 'Remarks',
			value: data.remarks,
		},
	];

	const diagnosis: IItemProps[] = [
		{
			label: 'Problems',
			value: data.order_problems_name.join(', ').replace(/_/g, ' '),
		},
		{
			label: 'Statement',
			value: data.problem_statement,
		},
		{
			label: 'Proposed Cost',
			value: data?.proposed_cost,
		},
		{
			label: 'Customer FeedBack',
			value: data.diagnosis?.customer_remarks,
		},
		{
			label: 'Bill Amount',
			value: data?.bill_amount,
		},
		{
			label: 'Challan No.',
			value: data?.challan_no,
		},
		{
			label: 'Challan Type',
			value: data?.challan_type,
		},
	];

	const statusItems = [
		{
			label: 'Diagnosing',
			value: Boolean(data.is_diagnosis_need),
		},
		{
			label: 'Repairing',
			value: Boolean(data.is_proceed_to_repair),
		},
		{
			label: 'Quality Inspection',
			value: Boolean(data.is_transferred_for_qc),
		},
		{
			label: 'Ready to Deliver',
			value: Boolean(data.is_ready_for_delivery),
		},
		{
			label: 'Delivered',
			value: Boolean(data.is_delivery_complete),
		},
	];

	// const diagnosisItems = (): IItemProps[] => {
	// 	return [
	// 		{
	// 			label: 'Diagnosis ID',
	// 			value: data?.diagnosis?.diagnosis_id,
	// 		},
	// 		{
	// 			label: 'Problem Statement',
	// 			value: data.diagnosis?.customer_problem_statement,
	// 		},
	// 		{
	// 			label: 'Proposed Cost',
	// 			value: data.diagnosis?.proposed_cost,
	// 		},
	// 		{
	// 			label: 'Customer FeedBack',
	// 			value: data.diagnosis?.customer_remarks,
	// 		},
	// 		{
	// 			label: 'Status Update Date',
	// 			value: data.diagnosis?.status_update_date && formatDateTable(data.diagnosis?.status_update_date),
	// 		},
	// 	];
	// };

	const processStatus =
		data.process &&
		data.process.length &&
		data.process.map((item) => ({
			label: item.section_name,
			value: Boolean(item.status),
		}));

	let currentStatus = '';
	if (data?.is_delivery_complete) {
		currentStatus = 'Delivered';
	} else if (data?.is_ready_for_delivery) {
		currentStatus = 'Ready to Deliver';
	} else if (data?.is_transferred_for_qc) {
		currentStatus = 'Quality Inspection';
	} else if (data?.is_proceed_to_repair) {
		currentStatus = 'Repairing';
	} else if (data?.is_diagnosis_need && data?.is_product_received) {
		currentStatus = 'Diagnosing';
	} else if (data?.is_product_received) {
		currentStatus = 'Product Received';
	} else {
		currentStatus = 'Order Received';
	}

	return (
		<Card className='w-full overflow-hidden border shadow-sm'>
			{/* Header - Redesigned */}
			<div className='border-b border-slate-200 bg-white px-4 py-3'>
				<div className='flex items-center justify-between'>
					<h3 className='font-medium text-primary'>{data.order_id}</h3>

					<Badge variant={'accent'}>{currentStatus}</Badge>
				</div>
			</div>

			{/* Main Content */}
			<div className='p-4'>
				{/* General & Product Info */}
				<div className='mb-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:grid-cols-4'>
					{items.map((item, index) => (
						<Item key={index} label={item.label} value={item.value} />
					))}
				</div>
				<Separator className='my-3' />

				{/* diagnosis */}
				<div className='mb-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs'>
					{diagnosis.map((item, index) => (
						<Item key={index} label={item.label} value={item.value} />
					))}
				</div>

				<Separator className='my-3' />

				{/* Status Section */}
				{processStatus !== 0 && (
					<div className='mb-3'>
						<h4 className='mb-2 text-xs font-medium text-slate-600'>Repair Status</h4>
						<div className='grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:grid-cols-3'>
							{processStatus?.map((item, index) => (
								<StatusLabel key={index} text={item.label} value={item.value} />
							))}
						</div>
					</div>
				)}

				<div className='mb-3'>
					<h4 className='mb-2 text-xs font-medium text-slate-600'>Status</h4>
					<div className='grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:grid-cols-3'>
						{statusItems.map((item, index) => (
							<StatusLabel key={index} text={item.label} value={item.value} />
						))}
					</div>
				</div>

				{/* Diagnosis Details */}
				{/* <div>
					<h4 className='mb-2 text-xs font-medium text-slate-600'>Diagnosis</h4>
					<div className='rounded-md border border-slate-100 bg-slate-50 p-3 text-xs'>
						<div className='grid grid-cols-2 gap-x-6 gap-y-2'>
							{diagnosisItems().map((item, index) => (
								<Item key={index} label={item.label} value={item.value} />
							))}
						</div>
					</div>
				</div> */}
			</div>
		</Card>
	);
};

export default OrderCard;
