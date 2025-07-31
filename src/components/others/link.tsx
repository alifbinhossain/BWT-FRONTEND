import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

import CopyClipboard from './copy-clipboard';

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

export const CustomLink = ({ label = '', url = '', name = '', showCopyButton = true, openInNewTab = false, className = '' }) => {
	if (!label) return '';

	const displayName = name ? name : label;
	return (
		<div className={cn('flex items-center gap-2', className)}>
			{showCopyButton && <CopyClipboard text={label} />}

			{url === null ? (
				<span>{displayName}</span>
			) : (
				<Link
					to={url}
					className={cn(
						'hover:text-info hover:decoration-info font-semibold underline underline-offset-2 transition-colors duration-300',
						url !== null ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed'
					)}
					target={openInNewTab ? '_blank' : '_self'}
				>
					{displayName}
				</Link>
			)}
		</div>
	);
};
