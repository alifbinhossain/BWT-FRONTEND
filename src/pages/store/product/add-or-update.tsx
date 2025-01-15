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

import { useOtherBrand, useOtherCategory, useOtherSize } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IProductTableData } from '../_config/columns/columns.type';
import { useStoreProductsByUUID } from '../_config/query';
import { PRODUCT_NULL, PRODUCT_SCHEMA } from '../_config/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IProductTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IProductTableData | null>>;
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
	const { data } = useStoreProductsByUUID<IProductTableData>(updatedData?.uuid as string);
	const { data: brandOptions } = useOtherBrand<IFormSelectOption[]>();
	const { data: sizeOptions } = useOtherSize<IFormSelectOption[]>();
	const { data: categoryOptions } = useOtherCategory<IFormSelectOption[]>();

	const typeOptions: IFormSelectOption[] = [
		{
			label: 'Service',
			value: 'service',
		},
		{
			label: 'Inventory',
			value: 'inventory',
		},
	];

	const form = useRHF(PRODUCT_SCHEMA, PRODUCT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PRODUCT_NULL);
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
	async function onSubmit(values: IProductTableData) {
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
			title={isUpdate ? `Update ${updatedData?.name} Group` : 'Add New Group'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='is_maintaing_stock'
				render={(props) => (
					<CoreForm.Checkbox
						label='Maintain Stock'
						defaultChecked={form.getValues('is_maintaing_stock')}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='category_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select Category'
						options={categoryOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='brand_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Brand' placeholder='Select Brand' options={brandOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='size_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Size' placeholder='Select Size' options={sizeOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='warranty_days'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='service_warranty'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='type'
				render={(props) => (
					<CoreForm.ReactSelect label='Type' placeholder='Select Type' options={typeOptions!} {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
