import React from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Clipboard } from 'lucide-react';

import { Button } from '../ui/button';

const CopyClipboard: React.FC<{
	text: string;
}> = ({ text }) => {
	const [copiedText, copy] = useCopyToClipboard();

	const handleCopy = (text: string) => () => {
		copy(text);
	};

	return (
		<Button variant={'ghost'} size={'icon'} onClick={handleCopy(text)}>
			<Clipboard className='size-4' />
		</Button>
	);
};

export default CopyClipboard;
