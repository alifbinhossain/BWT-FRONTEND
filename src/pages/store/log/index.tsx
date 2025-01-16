import { useEffect } from 'react';

import InternalTransfer from './internal-transfer';

const Log = () => {
	useEffect(() => {
		document.title = 'Store Log';
	}, []);
	return (
		<div>
			<InternalTransfer />
			<hr className='border-secondary-content my-6 border-2 border-dashed' />
		</div>
	);
};
export default Log;
