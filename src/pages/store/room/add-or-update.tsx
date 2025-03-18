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

import { useOtherRoom, useOtherWarehouse } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IRoomTableData } from '../_config/columns/columns.type';
import { useStoreRoomsByUUID } from '../_config/query';
import { ROOM_NULL, ROOM_SCHEMA } from '../_config/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IRoomTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IRoomTableData | null>>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AddOrUpdate: React.FC<IAddOrUpdateProps> = ({
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
	const { data } = useStoreRoomsByUUID<IRoomTableData>(updatedData?.uuid as string);
	const { data: warehouseOption } = useOtherWarehouse<IFormSelectOption[]>();
	const { invalidateQuery: invalidateRoom } = useOtherRoom<IFormSelectOption[]>();

	const form = useRHF(ROOM_SCHEMA, ROOM_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ROOM_NULL);
		setOpen((prev) => !prev);
		invalidateRoom();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IRoomTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Room` : 'Add New Room'}
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
						placeholder='Select Warehouse'
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
