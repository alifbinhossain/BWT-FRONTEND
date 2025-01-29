import { useEffect } from 'react';
import { IInternalTransferTableData } from '@/pages/store/_config/columns/columns.type';
import { useStoreInternalTransfersByUUID } from '@/pages/store/_config/query';
import { INTERNAL_TRANSFER_NULL, INTERNAL_TRANSFER_SCHEMA } from '@/pages/store/_config/schema';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import {
	useOtherBox,
	useOtherBranch,
	useOtherFloor,
	useOtherRack,
	useOtherWarehouse,
} from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { IInternalTransferAddOrUpdateProps } from '../../_config/types';

const AddOrUpdate: React.FC<IInternalTransferAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useStoreInternalTransfersByUUID<IInternalTransferTableData>(updatedData?.uuid as string);
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();

	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();
	const { data: branchOptions } = useOtherBranch<IFormSelectOption[]>();

	const form = useRHF(INTERNAL_TRANSFER_SCHEMA, INTERNAL_TRANSFER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(INTERNAL_TRANSFER_NULL);
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
	async function onSubmit(values: IInternalTransferTableData) {
		// UPDATE ITEM
		updateData.mutateAsync({
			url: `${url}/${updatedData?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
			},
			onClose,
		});
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.internal_transfer_id} Transfer` : 'Add New Transfer'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='from_branch_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='From'
						placeholder='Select Branch'
						options={branchOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='to_branch_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='To' placeholder='Select Branch' options={branchOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Warehouse'
						placeholder='Select Warehouse'
						options={warehouseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='rack_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Rack' placeholder='Select Rack' options={RackOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='floor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Floor' placeholder='Select Floor' options={FloorOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='box_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Box' placeholder='Select Box' options={BoxOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
