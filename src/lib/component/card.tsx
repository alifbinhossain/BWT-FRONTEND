import React from 'react';

import { cn } from '@/lib/utils';

interface CardProps {
	icon?: React.ReactNode;
	label: string;
	value: string;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ icon, label, value, className = '' }) => (
	<div className={cn('flex items-center gap-2.5 rounded-md border bg-base px-3 py-2.5', className)}>
		{icon && (
			<div className='flex size-10 shrink-0 items-center justify-center rounded-full border bg-white'>{icon}</div>
		)}
		<div>
			<p className='text-xs text-muted-foreground'>{label}</p>
			<p className='text-sm font-medium'>{value}</p>
		</div>
	</div>
);

export default Card;
