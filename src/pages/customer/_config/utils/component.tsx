import { Building2, Component, FileDigit, House, MapPin, Warehouse } from 'lucide-react';

import { TLocationProps, TProductProps } from '../types';

export const Product = ({ brand_name, model_name, serial_no }: TProductProps) => {
	return (
		<div className='flex flex-col gap-2'>
			{brand_name && (
				<div className='flex items-center gap-1'>
					<Building2 />
					<span className='font-semibold'>{brand_name}</span>
				</div>
			)}
			{model_name && (
				<div className='flex items-center gap-1'>
					<Component />
					<span className='font-semibold'>{model_name}</span>
				</div>
			)}
			{serial_no && (
				<div className='flex items-center gap-1'>
					<FileDigit />
					<span className='font-semibold'>{serial_no}</span>
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
				<House />
				<span className='font-semibold'>{branch_name}</span>
			</div>
			<div className='flex items-center gap-1'>
				<Warehouse />
				<span className='font-semibold'>{warehouse_name}</span>
			</div>
			{(rack_name || floor_name || box_name) && (
				<div className='flex items-center gap-1'>
					<MapPin />
					<span className='text-sm'>
						{rack_name}, {floor_name}, {box_name}
					</span>
				</div>
			)}
		</div>
	);
};
