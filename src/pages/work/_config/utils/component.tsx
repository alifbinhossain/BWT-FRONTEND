import {
	Building2,
	Component,
	FileDigit,
	House,
	MapPin,
	MessageSquareMore,
	Pin,
	Ruler,
	SquareMenu,
	Warehouse,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { TLocationProps, TProblemProps, TProductProps, TStoreProductProps, TWarrantyProps } from '../types';

export const Product = ({ brand_name, model_name, serial_no }: TProductProps) => {
	return (
		<div className='flex flex-col gap-2'>
			{brand_name && (
				<div className='flex items-center gap-1'>
					<Building2 size={16} />
					<span>{brand_name}</span>
				</div>
			)}
			{model_name && (
				<div className='flex items-center gap-1'>
					<Component size={16} />
					<span>{model_name}</span>
				</div>
			)}
			{serial_no && (
				<div className='flex items-center gap-1'>
					<FileDigit size={16} />
					<span>{serial_no}</span>
				</div>
			)}
		</div>
	);
};
export const StoreProduct = ({ name, model_name, category_name, size_name }: TStoreProductProps) => {
	return (
		<div className='flex flex-col gap-2'>
			{name && (
				<div className='flex items-center gap-1'>
					<Building2 size={16} />
					<span className='flex-1'>{name + ' (' + size_name + ')'}</span>
				</div>
			)}
			{model_name && (
				<div className='flex items-center gap-1'>
					<Component size={16} />
					<span className='flex-1'>{model_name}</span>
				</div>
			)}
			{category_name && (
				<div className='flex items-center gap-1'>
					<SquareMenu size={16} />
					<span className='flex-1'>{category_name}</span>
				</div>
			)}
		</div>
	);
};

export const TableForColumn = ({ value, headers }: any) => {
	const rowStyle = 'border border-gray-300 px-2 py-1 text-xs';
	return (
		value?.length !== undefined &&
		value?.length > 0 && (
			<table className='border-2 border-gray-300'>
				<thead>
					<tr className='text-xs text-gray-600'>
						{headers.map((header: any, idx: number) => (
							<th key={idx} className={cn(rowStyle)}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{value?.map((item: any, idx: number) => (
						<tr key={idx}>
							<td className={cn(rowStyle)}>{item.product_name}</td>
							<td className={cn(rowStyle)}>{item.warehouse_name}</td>
							<td className={cn(rowStyle)}>{item.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	);
};
export const Problem = ({ problem_statement, problems_name }: TProblemProps) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-1'>
				<Pin size={14} />
				{problems_name}
			</div>
			{problem_statement && (
				<div className='flex items-center gap-1 text-sm text-gray-500'>
					<MessageSquareMore size={14} />
					{problem_statement}
				</div>
			)}
		</div>
	);
};

export const Location = ({ branch_name, warehouse_name, rack_name, floor_name, box_name }: TLocationProps) => {
	if (!branch_name) return '--';
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-1'>
				<House className='size-4' />
				<span className='inline-block flex-1'>{branch_name}</span>
			</div>
			<div className='flex items-center gap-1'>
				<Warehouse className='size-4' />
				<span className='inline-block flex-1'>{warehouse_name}</span>
			</div>
			{(rack_name || floor_name || box_name) && (
				<div className='flex items-center gap-1'>
					<MapPin className='size-4' />
					<span className='inline-block flex-1 text-sm'>
						{rack_name}, {floor_name}, {box_name}
					</span>
				</div>
			)}
		</div>
	);
};
