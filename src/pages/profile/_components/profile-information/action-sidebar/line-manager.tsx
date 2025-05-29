import { IEmployeeTableData } from '@/pages/hr/_config/columns/columns.type';
import { useHrEmployeesByUUID } from '@/pages/hr/_config/query';
import { UserCheck, UserX } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';

import { getDateTime } from '@/utils';

const LineManager = () => {
	const { user } = useAuth();
	const { data, updateData } = useHrEmployeesByUUID<IEmployeeTableData>(user?.employee_uuid as string);

	const onSubmit = async () => {
		await updateData.mutateAsync({
			url: `/hr/employee/${user?.employee_uuid}`,
			updatedData: {
				is_line_manager: data?.is_line_manager ? false : true,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	};
	return (
		<Button
			variant={data?.is_line_manager ? 'outline-destructive' : 'outline'}
			onClick={onSubmit}
			className={`h-auto w-full justify-start px-4 py-2`}
		>
			{data?.is_line_manager ? <UserX className='mr-1 size-4' /> : <UserCheck className='mr-1 size-4' />}
			<span className='text-sm'>{data?.is_line_manager ? 'Remove Line Manager' : 'Set as Line Manager'}</span>
		</Button>
	);
};

export default LineManager;
