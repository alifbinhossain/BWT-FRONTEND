import { useEffect, useState } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherOrder, useOtherProduct, useOtherWarehouse } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IOrderTableData, IStockActionTrx, ITransferTableData } from '../../../_config/columns/columns.type';
import { useStoreOrderTransfersByUUID, useWorkOrderByDetails } from '../../../_config/query';
import { TRANSFER_NULL, TRANSFER_SCHEMA } from '../../../_config/schema';
import { getFilteredWarehouseOptions, ICustomProductsSelectOption, ICustomWarehouseSelectOption } from './utills';

interface ITrxProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IStockActionTrx | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IStockActionTrx | null>>;
	order_uuid?: string;
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

const Trx: React.FC<ITrxProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
	postData,
	order_uuid,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useStoreOrderTransfersByUUID<ITransferTableData>(updatedData?.uuid as string);
	const { data: productOptions } = useOtherProduct<ICustomProductsSelectOption[]>(`?is_quantity=true`);
	const { data: warehouseOptions } = useOtherWarehouse<ICustomWarehouseSelectOption[]>();
	const { invalidateQuery: invalidateQueryOrderByDetails } = useWorkOrderByDetails<IOrderTableData>(
		order_uuid as string
	);

	const { user } = useAuth();
	const [MAX_QUANTITY, setMAX_QUANTITY] = useState(0);
	const schema = TRANSFER_SCHEMA.extend({ quantity: z.number().int().positive().max(MAX_QUANTITY) });
	const form = useRHF(schema, TRANSFER_NULL);

	const filteredWarehouseOptions = getFilteredWarehouseOptions(
		form.watch('product_uuid'),
		productOptions,
		warehouseOptions
	);

	//* Set Max Quantity
	const product_uuid = form.watch('product_uuid');
	const warehouse_uuid = form.watch('warehouse_uuid');
	useEffect(() => {
		if (product_uuid && warehouse_uuid && productOptions) {
			const selectedProduct = productOptions.find((p) => p.value === product_uuid);
			const selectedWarehouse = warehouseOptions?.find((w) => w.value === warehouse_uuid);

			if (selectedProduct && selectedWarehouse) {
				const warehouseKey = selectedWarehouse.assigned;
				const quantity = (selectedProduct[warehouseKey as keyof ICustomProductsSelectOption] as number) || 0;
				setMAX_QUANTITY(quantity);
			} else {
				setMAX_QUANTITY(0);
			}
		} else {
			setMAX_QUANTITY(0);
		}
	}, [product_uuid, warehouse_uuid, productOptions, warehouseOptions]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TRANSFER_NULL);
		setOpen((prev) => !prev);
		invalidateQueryOrderByDetails();
	};
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	// Submit handler
	async function onSubmit(values: IStockActionTrx) {
		if (isUpdate) {
			// ADD NEW ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					order_uuid: order_uuid,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		} else {
			await postData.mutateAsync({
				url,
				newData: {
					...values,
					order_uuid: order_uuid,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal open={open} setOpen={onClose} title={'Transfer Material'} form={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='product_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Product'
						placeholder='Select Order'
						options={productOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Warehouse'
						placeholder='Select Order'
						options={filteredWarehouseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => (
					<CoreForm.Input label={`Quantity (Max Transfer: ${MAX_QUANTITY})`} type='number' {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default Trx;
