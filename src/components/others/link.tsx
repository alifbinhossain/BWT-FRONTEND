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

// interface BaseBodyProps {
// 	value: string;
// 	to: string;
// 	showCopyButton?: boolean;
// }

// const BaseBody = ({ value, to, showCopyButton = true }: BaseBodyProps) => {
// 	if (!value) return '--';
// 	return (
// 		<button className='hover:text-info hover:decoration-info flex items-center gap-2 text-left font-semibold underline underline-offset-2 transition-colors duration-300'>
// 			{showCopyButton && <CopyButton id={value} />}
// 			<Link target='_blank' to={to}>
// 				{value}
// 			</Link>
// 		</button>
// 	);
// };

// interface LinkWithCopyProps {
// 	title?: string;
// 	id: string;
// 	uri?: string;
// }

// export const LinkWithCopy = ({ title = '', id, uri = '' }: LinkWithCopyProps) => {
// 	const value = title ? title : id;
// 	const to = `${uri}`;

// 	return <BaseBody value={value} to={to} />;
// };

// const LinkOnly = ({ title = '', id, uri = '' }) => {
// 	const value = title ? title : id;
// 	const to = `${uri}/${id}`;

// 	return <BaseBody value={value} to={to} showCopyButton={false} />;
// };

// const LinkCopyOnly = ({ id }) => (
// 	<button className='flex items-center gap-2 text-left font-semibold'>
// 		<CopyButton id={id} />
// 		<span>{id}</span>
// 	</button>
// );

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

// export { LinkCopyOnly, LinkOnly, LinkWithCopy, CustomLink };
