import { Building2, Component, FileDigit, House, MapPin, MessageSquareMore, Pin, Warehouse } from 'lucide-react';

import { TLocationProps, TProblemProps, TProductProps } from '../types';

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
				<House size={16} />
				<span>{branch_name}</span>
			</div>
			<div className='flex items-center gap-1'>
				<Warehouse size={16} />
				<span>{warehouse_name}</span>
			</div>
			{(rack_name || floor_name || box_name) && (
				<div className='flex items-center gap-1'>
					<MapPin size={16} />
					<span className='text-sm'>
						{rack_name}, {floor_name}, {box_name}
					</span>
				</div>
			)}
		</div>
	);
};
