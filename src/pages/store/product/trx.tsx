import { useEffect, useState } from 'react';
import { ICustomProductsSelectOption, ICustomWarehouseSelectOption } from '@/pages/work/order/details/transfer/utills';
import {
	IDefaultAddOrUpdateProps,
	IResponse,
	IToast,
} from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import {
	useOtherBox,
	useOtherFloor,
	useOtherProduct,
	useOtherRack,
	useOtherWarehouse,
} from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IStockActionTrx } from '../_config/columns/columns.type';
import { INTERNAL_TRANSFER_NULL, INTERNAL_TRANSFER_SCHEMA } from '../_config/schema';

// interface ITrxProps extends IDefaultAddOrUpdateProps {
// 	updatedData: IStockActionTrx | null;
// }

export interface ITrxPropsAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	updatedData: IStockActionTrx | null;
	postData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
const Trx: React.FC<ITrxPropsAddOrUpdateProps> = ({ url, open, setOpen, updatedData, setUpdatedData, postData }) => {
	const { data: warehouseOptions } = useOtherWarehouse<ICustomWarehouseSelectOption[]>();
	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();
	const { data: productOptions } = useOtherProduct<ICustomProductsSelectOption[]>();

	const { user } = useAuth();
	const [MAX_QUANTITY, SET_MAX_QUANTITY] = useState(Infinity);
	const schema = INTERNAL_TRANSFER_SCHEMA.extend({ quantity: z.number().int().positive().max(MAX_QUANTITY) });
	const form = useRHF(schema, INTERNAL_TRANSFER_NULL);
	// const from_warehouse = warehouseOptions
	// 	? warehouseOptions.filter((w) => w.value === form.watch('from_warehouse_uuid'))
	// 	: [];
	// const from_warehouse_assignged = from_warehouse[0]?.assigned;
	// const product = productOptions?.filter((p) => p.value === updatedData?.product_uuid);
	// console.log(product);

	useEffect(() => {
		if (updatedData) {
			SET_MAX_QUANTITY(form.watch('quantity') || Infinity);
		} else {
			SET_MAX_QUANTITY(Infinity);
		}
	});

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(INTERNAL_TRANSFER_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IStockActionTrx) {
		// ADD NEW ITEM
		postData.mutateAsync({
			url,
			newData: {
				...values,
				product_uuid: updatedData?.uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			},
			onClose,
		});
	}

	return (
		<AddModal open={open} setOpen={onClose} title={'Transfer Material'} form={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='from_warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='From'
						placeholder='Select Warehouse'
						options={
							warehouseOptions
								? warehouseOptions.filter((w) => w.value !== form.watch('to_warehouse_uuid'))
								: []
						}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='to_warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='To'
						placeholder='Select Warehouse'
						options={
							warehouseOptions
								? warehouseOptions.filter((w) => w.value !== form.watch('from_warehouse_uuid'))
								: []
						}
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

export default Trx;
