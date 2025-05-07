import { Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { ShowLocalToast } from './toast';

interface ILinkOnlyProps {
	uri: string;
	title: string;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
	return (
		<Link target='_blank' to={uri} className='font-medium text-foreground underline hover:text-accent'>
			{title}
		</Link>
	);
};

const CopyButton = ({ id, className }: { id: string; className?: string }) => {
	const handleOnClick = () => {
		navigator.clipboard.writeText(id);

		ShowLocalToast({
			type: 'create',
			message: `${id} copied`,
		});
	};

	return (
		<div onClick={() => handleOnClick()} aria-label='Copy ID to clipboard'>
			<Clipboard className={cn('h-4 w-4 transition-transform duration-200 hover:scale-110', className)} />
		</div>
	);
};


export const CustomLink = ({ label ='', url = '', showCopyButton = true, openInNewTab = false, className = '' }) => {
	if (!label) return '--';

	return (
		<div className={cn('flex items-center gap-2', className)}>
			{showCopyButton && (
				<CopyButton
					id={label}
					className='hover:text-info hover:decoration-info transition-colors duration-300'
				/>
			)}

			{url === null ? (
				<span>{label}</span>
			) : (
				<Link
					to={url}
					className={cn(
						'hover:text-info hover:decoration-info font-semibold underline underline-offset-2 transition-colors duration-300',
						url !== null ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed'
					)}
					target={openInNewTab ? '_blank' : '_self'}
				>
					{label}
				</Link>
			)}
		</div>
	);
};


