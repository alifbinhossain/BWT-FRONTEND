import { error } from 'console';
import { useEffect } from 'react';
import { IPurchaseReturnEntryTableData } from '@/pages/store/_config/columns/columns.type';
import { useStorePurchaseReturnEntryByUUID } from '@/pages/store/_config/query';
import { PURCHASE_RETURN_LOG_NULL, PURCHASE_RETURN_LOG_SCHEMA } from '@/pages/store/_config/schema';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import {
	useOtherBox,
	useOtherBranch,
	useOtherFloor,
	useOtherProduct,
	useOtherRack,
	useOtherRoom,
	useOtherStock,
	useOtherWarehouse,
} from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IPurchaseReturnLogAddOrUpdateProps } from '../../_config/types';

const AddOrUpdate: React.FC<IPurchaseReturnLogAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useStorePurchaseReturnEntryByUUID<IPurchaseReturnEntryTableData>(updatedData?.uuid as string);
	const { data: productOptions } = useOtherProduct<IFormSelectOption[]>();

	const form = useRHF(PURCHASE_RETURN_LOG_SCHEMA, PURCHASE_RETURN_LOG_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PURCHASE_RETURN_LOG_NULL);
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
	async function onSubmit(values: IPurchaseReturnEntryTableData) {
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
			title={`Update ${updatedData?.purchase_return_id} Log`}
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
				name='quantity'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='price_per_unit'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
