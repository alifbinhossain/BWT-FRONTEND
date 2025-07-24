import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

// import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import '@/lib/common-queries/other';

import { lazy, Suspense, useEffect, useState } from 'react';
import { useStoreProducts } from '@/pages/store/_config/query';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { IFormSelectOption } from '@/components/core/form/types';
import { ShowLocalToast } from '@/components/others/toast';

import { useOtherProblem, useOtherProduct, useOtherPurchaseEntry, useOtherWarehouse } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkOrderByDetails, useWorkOrderByUUID, useWorkRepairing } from '../_config/query';
import { IRepair, REPAIR_NULL, REPAIR_SCHEMA } from '../_config/schema';
import { ICustomProductsSelectOption, ICustomWarehouseSelectOption } from '../order/details/transfer/utills';
import { orderFields } from '../order/utill';
import Information from './information';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;
	const navigate = useNavigate();
	const { data: purchaseEntryOptions, invalidateQuery: invalidateQueryOtherProduct } = useOtherPurchaseEntry<
		ICustomProductsSelectOption[]
	>(`is_warehouse=true&&is_purchase_return_entry=false`);
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('employee');
	const { data: warehouseOptions, invalidateQuery: invalidateQueryOtherWarehouse } =
		useOtherWarehouse<ICustomWarehouseSelectOption[]>();
	const { data, updateData, postData, imageUpdateData, deleteData } = useWorkOrderByUUID<IOrderTableData>(
		uuid as string
	);

	const { data: orderData, invalidateQuery: invalidateQueryOrderByDetails } = useWorkOrderByDetails<IOrderTableData>(
		uuid as string
	);
	const { invalidateQuery: invalidateQueryRepairing } = useWorkRepairing<IOrderTableData[]>();
	const { invalidateQuery: invalidateQueryProduct } = useStoreProducts<IFormSelectOption[]>();

	const form = useRHF(REPAIR_SCHEMA, REPAIR_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'product_transfer',
	});
	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	const handleAdd = () => {
		append({
			purchase_entry_uuid: '',
			warehouse_uuid: '',
			remarks: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const stock_id: string =
			String(
				purchaseEntryOptions?.find(
					(p) => p.value === form.getValues('product_transfer')[index].purchase_entry_uuid
				)?.label
			) || '';
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: stock_id,
			});
		} else {
			remove(index);
		}
	};
	const felidDefs = useGenerateFieldDefs({
		remove: handleRemove,
		watch: form.watch,
		form,
		data,
	});

	// Submit handler
	async function onSubmit(values: IRepair) {
		values.product_transfer.forEach((item: any, index: number) => {
			const warehouse = warehouseOptions?.find((w) => w.value === item.warehouse_uuid);
			const product = purchaseEntryOptions?.find((p) => p.value === item.purchase_entry_uuid);
		});

		if (isUpdate) {
			const order_data = {
				...values,
				product_transfer: null,
				updated_at: getDateTime(),
			};
			const formData = Formdata({
				...order_data,
			});
			orderFields.forEach((field) => {
				if (
					values[field as keyof typeof values] == null ||
					values[field as keyof typeof values] === '' ||
					values[field as keyof typeof values] === undefined ||
					(Array.isArray(values[field as keyof typeof values]) &&
						(values[field as keyof typeof values] as unknown[]).length === 0)
				) {
					formData.delete(field);
				}
			});
			const order_promise = await imageUpdateData.mutateAsync({
				url: `/work/order/${uuid}`,
				updatedData: order_data,
				isOnCloseNeeded: false,
			});

			const product_transfer_promise = values.product_transfer.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						order_uuid: uuid,
						quantity: 1,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/store/product-transfer',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						quantity: 1,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/store/product-transfer/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([order_promise, ...product_transfer_promise])
					.then(() => form.reset(REPAIR_NULL))
					.then(() => {
						invalidateQueryOrderByDetails();
						invalidateQueryOtherProduct();
						invalidateQueryOtherWarehouse();
						invalidateQueryRepairing();
						invalidateQueryProduct();
						navigate(`/work/repairing`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}
	}

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Repairing Order' : ' Add Repairing Order'}
			form={form}
			onSubmit={onSubmit}
		>
			<Information data={(orderData || []) as IOrderTableData} />
			<CoreForm.Section
				title={isUpdate ? 'Edit Repairing Order' : ' Add Repairing Order'}
				className='flex'
				extraHeader={
					<div className='flex gap-2 text-warning-foreground'>
						<FormField
							control={form.control}
							name='is_transferred_for_qc'
							render={(props) => (
								<CoreForm.Checkbox
									className='bg-warning-foreground'
									label='Transfer to QC'
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='is_ready_for_delivery'
							render={(props) => (
								<CoreForm.Checkbox
									label='Ready for Delivery'
									className='bg-warning-foreground'
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				<FormField
					control={form.control}
					name='repairing_problems_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							isMulti
							label='Problems'
							menuPortalTarget={document.body}
							options={problemOption!}
							placeholder='Select Problems'
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='repairing_problem_statement'
					render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
				/>
				<FormField
					control={form.control}
					name='remarks'
					render={(props) => <CoreForm.Textarea label='Remarks' className='flex-1' {...props} />}
				/>
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='Repairing Product Transfer'
				form={form}
				fieldName='product_transfer'
				fieldDefs={felidDefs}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/store/product-transfer`,
						deleteData,
						onClose: () => {
							form.setValue(
								'product_transfer',
								form.getValues('product_transfer').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
						needRefresh: true,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;

