import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useStorePurchases, useStorePurchasesByUUID } from '../../_config/query';
import { IPurchase, PURCHASE_NULL, PURCHASE_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: purchaseUrl, updateData, postData, deleteData } = useStorePurchases();

	const { data, invalidateQuery: invalidateTestDetails } = useStorePurchasesByUUID(uuid as string);

	const form = useRHF(PURCHASE_SCHEMA, PURCHASE_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'purchase_entry',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IPurchase) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const purchase_data = {
				...values,
				updated_at: getDateTime(),
			};

			const test_promise = await updateData.mutateAsync({
				url: `${purchaseUrl}/${uuid}`,
				updatedData: purchase_data,
				isOnCloseNeeded: false,
			});

			const purchase_entry_promise = values.purchase_entry.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						purchase_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/store/purchase-entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/store/purchase-entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([test_promise, ...purchase_entry_promise])
					.then(() => form.reset(PURCHASE_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/store/purchase/${uuid}/details`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const new_purchase_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const purchase_data = {
			...values,
			uuid: new_purchase_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('purchase_entry' in purchase_data) {
			delete (purchase_data as { purchase_entry?: any })['purchase_entry'];
		}

		// TODO: Update url and variable name ⬇️
		const purchase_promise = await postData.mutateAsync({
			url: purchaseUrl,
			newData: purchase_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const purchase_entry_entries = [...values.purchase_entry].map((item) => ({
			...item,
			purchase_uuid: new_purchase_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const purchase_entry_entries_promise = purchase_entry_entries.map((item) =>
			postData.mutateAsync({
				url: '/store/purchase-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
		
			await Promise.all([purchase_promise, ...purchase_entry_entries_promise])
				.then(() => form.reset(PURCHASE_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/store/purchase/${new_purchase_uuid}/details`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			stock_uuid: '',
			serial_no: '',
			quantity: 0,
			price_per_unit: 0,
			discount: 0,
			remarks: '',
			warehouse_uuid: '',
			rack_uuid: '',
			floor_uuid: '',
			box_uuid: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const stock_id: string = String(form.getValues('purchase_entry')[index].stock_id);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: stock_id,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('purchase_entry')[index];
		append({
			stock_uuid: field.stock_uuid,
			serial_no: field.serial_no,
			quantity: field.quantity,
			price_per_unit: field.price_per_unit,
			discount: field.discount,
			remarks: field.remarks,
			warehouse_uuid: field.warehouse_uuid,
			rack_uuid: field.rack_uuid,
			floor_uuid: field.floor_uuid,
			box_uuid: field.box_uuid,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Purchase Entry' : ' Add Purchase Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='purchase_entry'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/store/purchase-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'purchase_entry',
								form.getValues('purchase_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
