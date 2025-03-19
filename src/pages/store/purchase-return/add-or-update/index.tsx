import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useStorePurchaseReturn, useStorePurchaseReturnByUUID } from '../../_config/query';
import { IPurchaseReturn, PURCHASE_RETURN_NULL, PURCHASE_RETURN_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: purchaseReturnUrl, updateData, postData, deleteData } = useStorePurchaseReturn();
	

	const { data, invalidateQuery: invalidateTestDetails } = useStorePurchaseReturnByUUID(uuid as string);

	const form = useRHF(PURCHASE_RETURN_SCHEMA, PURCHASE_RETURN_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'purchase_return_entry',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IPurchaseReturn) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const purchase_return_data = {
				...values,
				updated_at: getDateTime(),
			};

			const purchase_return_promise = await updateData.mutateAsync({
				url: `${purchaseReturnUrl}/${uuid}`,
				updatedData: purchase_return_data,
				isOnCloseNeeded: false,
			});

			const purchase_return_entry_promise = values.purchase_return_entry.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						purchase_return_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/store/purchase-return-entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/store/purchase-return-entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([purchase_return_promise, ...purchase_return_entry_promise])
					.then(() => form.reset(PURCHASE_RETURN_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/store/purchase-return/${uuid}/details`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const new_purchase_return_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const purchase_return_data = {
			...values,
			uuid: new_purchase_return_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('purchase_return_entry' in purchase_return_data) {
			delete (purchase_return_data as { purchase_return_entry?: any })['purchase_return_entry'];
		}

		const purchase_return_promise = await postData.mutateAsync({
			url: purchaseReturnUrl,
			newData: purchase_return_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const purchase_return_entry_entries = [...values.purchase_return_entry].map((item) => ({
			...item,
			purchase_return_uuid: new_purchase_return_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const purchase_return_entry_entries_promise = purchase_return_entry_entries.map((item) =>
			postData.mutateAsync({
				url: '/store/purchase-return-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([purchase_return_promise, ...purchase_return_entry_entries_promise])
				.then(() => form.reset(PURCHASE_RETURN_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/store/purchase-return/${new_purchase_return_uuid}/details`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			product_uuid: '',
			quantity: 0,
			price_per_unit: 0,
			remarks: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const productName: string = String(form.getValues('purchase_return_entry')[index].product_name);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: productName,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('purchase_return_entry')[index];
		append({
			product_uuid: field.product_uuid,
			quantity: field.quantity,
			price_per_unit: field.price_per_unit,
			remarks: field.remarks,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Purchase Return Entry' : ' Add Purchase Return Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='purchase_return_entry'
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
						url: `/store/purchase-return-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'purchase_return_entry',
								form.getValues('purchase_return_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
