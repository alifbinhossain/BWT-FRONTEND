import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IPolicyTableData } from '../_config/columns/columns.type';
import { useHrLeaveCategory, useHrLeavePolicy, useHrLeavePolicyByUUID } from '../_config/query';
import { ILeavePolicy, LEAVE_CATEGORY_SCHEMA, LEAVE_POLICY_NULL } from '../_config/schema';
import { IPolicyAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IPolicyAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateUsers } = useHrLeavePolicy();
	const { invalidateQuery: invalidateDesignations } = useHrLeaveCategory();
	const { data } = useHrLeavePolicyByUUID<IPolicyTableData>(updatedData?.uuid as string);

	const form = useRHF(LEAVE_CATEGORY_SCHEMA, LEAVE_POLICY_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(LEAVE_POLICY_NULL);
		invalidateUsers();
		invalidateDesignations();
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
	async function onSubmit(values: ILeavePolicy) {
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
			title={isUpdate ? 'Update Leave Policy' : 'Add Leave Policy'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
