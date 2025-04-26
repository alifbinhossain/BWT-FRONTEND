import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherBranch } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IWarehouseTableData } from '../_config/columns/columns.type';
import { useStoreWarehousesByUUID } from '../_config/query';
import { WAREHOUSE_NULL, WAREHOUSE_SCHEMA } from '../_config/schema';
import { IWarehouseAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IWarehouseAddOrUpdateProps> = ({
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
	const { data } = useStoreWarehousesByUUID<IWarehouseTableData>(updatedData?.uuid as string);
	const { data: branchOption } = useOtherBranch<IFormSelectOption[]>();
	const assignationOptions = [
		{
			label: 'Warehouse 1',
			value: 'warehouse_1',
		},
		{
			label: 'Warehouse 2',
			value: 'warehouse_2',
		},
		{
			label: 'Warehouse 3',
			value: 'warehouse_3',
		},
		{
			label: 'Warehouse 4',
			value: 'warehouse_4',
		},
		{
			label: 'Warehouse 5',
			value: 'warehouse_5',
		},
		{
			label: 'Warehouse 6',
			value: 'warehouse_6',
		},
		{
			label: 'Warehouse 7',
			value: 'warehouse_7',
		},
		{
			label: 'Warehouse 8',
			value: 'warehouse_8',
		},
		{
			label: 'Warehouse 9',
			value: 'warehouse_9',
		},
		{
			label: 'Warehouse 10',
			value: 'warehouse_10',
		},
		{
			label: 'Warehouse 11',
			value: 'warehouse_11',
		},
		{
			label: 'Warehouse 12',
			value: 'warehouse_12',
		},
		{
			label: 'Warehouse 13',
			value: 'warehouse_13',
		},
	];

	const form = useRHF(WAREHOUSE_SCHEMA, WAREHOUSE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(WAREHOUSE_NULL);
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
	async function onSubmit(values: IWarehouseTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Warehouse` : 'Add New Warehouse'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='branch_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Branch'
						placeholder='Select Branch'
						options={branchOption!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='assigned'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Warehouse'
						placeholder='Select Warehouse'
						options={assignationOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
