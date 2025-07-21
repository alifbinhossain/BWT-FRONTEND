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

import { useOtherProduct, useOtherStock } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IStockTableData } from '../_config/columns/columns.type';
import { useStoreStocksByUUID } from '../_config/query';
import { STOCK_NULL, STOCK_SCHEMA } from '../_config/schema';
import { IStockAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IStockAddOrUpdateProps> = ({
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
	const { data } = useStoreStocksByUUID<IStockTableData>(updatedData?.uuid as string);
	const { data: productOptions } = useOtherProduct<IFormSelectOption[]>();
	const { invalidateQuery: invalidateStock } = useOtherStock<IFormSelectOption[]>();

	const form = useRHF(STOCK_SCHEMA, STOCK_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(STOCK_NULL);
		setOpen((prev) => !prev);
		invalidateStock();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IStockTableData) {
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
			title={isUpdate ? `Update ${updatedData?.stock_id} Stock` : 'Add New Stock'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='product_entry_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Product'
						placeholder='Select Product'
						options={productOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='warehouse_1'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='warehouse_2'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='warehouse_3'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
