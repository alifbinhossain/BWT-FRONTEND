import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

// import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import '@/lib/common-queries/other';

import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ShowLocalToast } from '@/components/others/toast';

import { useOtherProduct, useOtherWarehouse } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkOrderByDetails, useWorkOrderByUUID, useWorkRepairing } from '../_config/query';
import { IRepair, REPAIR_NULL, REPAIR_SCHEMA } from '../_config/schema';
import { ICustomProductsSelectOption, ICustomWarehouseSelectOption } from '../order/details/transfer/utills';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;
	const navigate = useNavigate();
	const { data: productOptions, invalidateQuery: invalidateQueryOtherProduct } =
		useOtherProduct<ICustomProductsSelectOption[]>(`?is_quantity=true`);
	const { data: warehouseOptions, invalidateQuery: invalidateQueryOtherWarehouse } =
		useOtherWarehouse<ICustomWarehouseSelectOption[]>();
	const { data, updateData, postData, deleteData } = useWorkOrderByUUID<IOrderTableData>(uuid as string);
	const { invalidateQuery: invalidateQueryOrderByDetails } = useWorkOrderByDetails<IOrderTableData>(uuid as string);
	const { invalidateQuery: invalidateQueryRepairing } = useWorkRepairing<IOrderTableData[]>();

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
			product_uuid: '',
			quantity: 0,
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
				productOptions?.find((p) => p.value === form.getValues('product_transfer')[index].product_uuid)?.label
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
		let valid = true;

		values.product_transfer.forEach((item: any, index: number) => {
			const warehouse = warehouseOptions?.find((w) => w.value === item.warehouse_uuid);
			const product = productOptions?.find((p) => p.value === item.product_uuid);

			if (!product) {
				ShowLocalToast({
					type: 'error',
					message: `Product not found for the selected product_uuid: ${item.product_uuid}.`,
				});
				valid = false;
				return;
			}
			if (typeof item.quantity !== 'number' || item.quantity < 0) {
				ShowLocalToast({
					type: 'error',
					message: `Invalid or missing quantity for product ${product.label}. Quantity provided: ${item.quantity}.`,
				});
				valid = false;
				return;
			}

			const assignedKey = warehouse?.assigned;
			if (!assignedKey) {
				ShowLocalToast({ type: 'error', message: `Assigned key not found in warehouse ${warehouse?.label}.` });
				return;
			}
			if (!(assignedKey in product)) {
				ShowLocalToast({
					type: 'error',
					message: `Assigned key '${assignedKey}' not found in product ${product.label}.`,
				});
				valid = false;
				return;
			}

			const availableQty = (product as any)[assignedKey];
			if (typeof availableQty !== 'number') {
				ShowLocalToast({
					type: 'error',
					message: `Product ${product.label} does not have a valid available quantity for '${assignedKey}'. Found: ${availableQty}`,
				});
				valid = false;
				return;
			}
			const prevQty = data?.product_transfer?.[index]?.quantity ?? 0;
			if (availableQty + prevQty < item.quantity) {
				// Now this comparison is safe
				ShowLocalToast({
					type: 'error',
					message: `Product ${product.label} has only ${availableQty} quantity, but ${item.quantity} were requested.`,
				});
				valid = false;
				return;
			}
		});
		if (!valid) {
			return;
		}

		if (isUpdate) {
			const order_data = {
				...values,
				updated_at: getDateTime(),
			};

			const order_promise = await updateData.mutateAsync({
				url: `/work/order/${uuid}`,
				updatedData: order_data,
				isOnCloseNeeded: false,
			});

			const product_transfer_promise = values.product_transfer.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						order_uuid: uuid,
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
