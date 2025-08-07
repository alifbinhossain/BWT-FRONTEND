import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';

import { DeleteModal } from '@/components/core/modal';
import { Button } from '@/components/ui/button';

const DeleteEmployee = (data: any) => {
	const { user, deleteProfileData } = useProfile();
	const { uuid } = useParams();
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	return (
		<>
			<Button
				onClick={() =>
					setDeleteItem({ id: data?.data?.uuid as string, name: data?.data?.employee_name as string })
				}
				variant={'destructive'}
				className={`h-auto w-full justify-start px-4 py-2`}
			>
				<Trash2 className='mr-1 size-4' />
				<span className='text-sm'>Delete Employee</span>
			</Button>
			<DeleteModal
				{...{
					deleteItem,
					setDeleteItem,
					url: '/hr/employee',
					deleteData: deleteProfileData,
				}}
			/>
		</>
	);
};

export default DeleteEmployee;
