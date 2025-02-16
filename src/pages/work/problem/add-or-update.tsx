import { useEffect } from 'react';
import { IProblemsTableData } from '@/pages/work/_config/columns/columns.type';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useWorkProblemsByUUID } from '../_config/query';
import { PROBLEM_NULL, PROBLEM_SCHEMA } from '../_config/schema';
import { IProblemAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IProblemAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useWorkProblemsByUUID<IProblemsTableData>(updatedData?.uuid as string);

	const categoryOption = [
		{ label: 'Employee', value: 'employee' },
		{ label: 'Customer', value: 'customer' },
	];

	const form = useRHF(PROBLEM_SCHEMA, PROBLEM_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PROBLEM_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IProblemsTableData) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.name} Problem` : 'Add New Problem'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<div className='flex-1'>
				<FormField
					control={form.control}
					name='category'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Category'
							placeholder='Select Category'
							options={categoryOption!}
							{...props}
						/>
					)}
				/>
			</div>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
