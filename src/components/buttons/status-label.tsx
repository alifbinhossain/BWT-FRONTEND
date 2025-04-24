import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const StatusLabel: React.FC<{
	value: boolean;
	text: string;
}> = ({ text, value }) => {
	return (
		<div className='flex items-center gap-1.5'>
			{value === true ? (
				<CheckCircle className='size-3.5 shrink-0 text-green-500' />
			) : (
				<XCircle className='size-3.5 shrink-0 text-rose-500' />
			)}
			<span>{text}</span>
		</div>
	);
};

export default StatusLabel;
