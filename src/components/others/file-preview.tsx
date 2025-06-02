import { API_IMAGE_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

import { ButtonProps, buttonVariants } from '../ui/button';

const FilePreview: React.FC<{
	preview: string | ArrayBuffer | null;
	children?: React.ReactNode;
	buttonProps?: ButtonProps;
}> = ({ preview, children, buttonProps }) => {
	return (
		<a
			className={buttonVariants({
				variant: buttonProps?.variant || 'accent',
				size: buttonProps?.size || 'sm',
				className: buttonProps?.className,
			})}
			target='_blank'
			href={(API_IMAGE_URL + preview) as string}
		>
			{children}
		</a>
	);
};

export default FilePreview;
