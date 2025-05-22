import { useMemo } from 'react';
import { PageProvider } from '@/context';

import { PageInfo } from '@/utils';

import ApplyLeave from './apply-leave';
import LateApproval from './late-approval';
import ManualEntry from './manual-entry';

const User = () => {
	const pageInfo = useMemo(
		() => new PageInfo('Pending Approval', '/hr/pending-approval', 'admin__pending_approval'),
		[]
	);

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='flex flex-col gap-8'>
				<ApplyLeave />
				<ManualEntry />
				<LateApproval />
			</div>
		</PageProvider>
	);
};

export default User;
