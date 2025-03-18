import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherRack, useOtherWarehouse } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IRackTableData } from '../_config/columns/columns.type';
import { useStoreRacksByUUID } from '../_config/query';
import { RACK_NULL, RACK_SCHEMA } from '../_config/schema';
import { IRackAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IRackAddOrUpdateProps> = ({
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
	const { data } = useStoreRacksByUUID<IRackTableData>(updatedData?.uuid as string);
	const { data: warehouseOption } = useOtherWarehouse<IFormSelectOption[]>();
	const { invalidateQuery: invalidateRack } = useOtherRack<IFormSelectOption[]>();

	const form = useRHF(RACK_SCHEMA, RACK_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(RACK_NULL);
		setOpen((prev) => !prev);
		invalidateRack();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IRackTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Rack` : 'Add New Rack'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Warehouse'
						placeholder='Select warehouse'
						options={warehouseOption!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
