import React from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Clipboard } from 'lucide-react';

import { Button } from '../ui/button';
import { ShowLocalToast } from './toast';

const CopyClipboard: React.FC<{
	text: string;
}> = ({ text }) => {
	const [copiedText, copy] = useCopyToClipboard();

	const handleCopy = (text: string) => () => {
		copy(text);
		ShowLocalToast({
			type: 'create',
			message: `${text} copied`,
		});
	};

	return <Clipboard size={14} onClick={handleCopy(text)} />;
};

export default CopyClipboard;
