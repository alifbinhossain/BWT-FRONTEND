import { useEffect } from 'react';
import { IPurchaseEntryTableData } from '@/pages/store/_config/columns/columns.type';
import { useStorePurchaseEntryByUUID } from '@/pages/store/_config/query';
import { PURCHASE_LOG_NULL, PURCHASE_LOG_SCHEMA } from '@/pages/store/_config/schema';
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
import { getDateTime } from '@/utils';

import { IPurchaseLogAddOrUpdateProps } from '../../_config/types';

const AddOrUpdate: React.FC<IPurchaseLogAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useStorePurchaseEntryByUUID<IPurchaseEntryTableData>(updatedData?.uuid as string);
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();
	const { data: productOptions } = useOtherProduct<IFormSelectOption[]>();

	const form = useRHF(PURCHASE_LOG_SCHEMA, PURCHASE_LOG_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PURCHASE_LOG_NULL);
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
	async function onSubmit(values: IPurchaseEntryTableData) {
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
			title={`Update ${updatedData?.purchase_id} Log`}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='product_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Product'
						placeholder='Select Product'
						isDisabled={true}
						options={productOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='serial_no'
				render={(props) => <CoreForm.Input disabled={true} {...props} />}
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
