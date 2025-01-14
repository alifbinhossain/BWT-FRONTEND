import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { Switch } from '@/components/ui/switch';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useThreadOrderInfo, useThreadOrderInfoDetailsByUUID } from '../../_config/query';
import {
	IThreadOrderInfoEntry,
	THREAD_ORDER_INFO_ENTRY_NULL,
	THREAD_ORDER_INFO_ENTRY_SCHEMA,
} from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams();
	const isUpdate = !!id;

	const { url: threadOrderInfoUrl, updateData, postData, deleteData } = useThreadOrderInfo();

	const { data, invalidateQuery: invalidateOrderInfoDetails } = useThreadOrderInfoDetailsByUUID(id as string);

	const form = useRHF(THREAD_ORDER_INFO_ENTRY_SCHEMA, THREAD_ORDER_INFO_ENTRY_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'order_info_entry',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IThreadOrderInfoEntry) {
		/* -------------------------------------------------------------------------- */
		/*                              UPDATE ORDER INFO                             */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const order_info_data = {
				...values,
				updated_at: getDateTime(),
			};

			const order_info_promise = await updateData.mutateAsync({
				url: `${threadOrderInfoUrl}/${id}`,
				updatedData: order_info_data,
				isOnCloseNeeded: false,
			});

			const order_info_entries_promise = values.order_info_entry.map((item: any) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						swatch_approval_date: item.recipe_uuid === null ? null : getDateTime(),
						order_info_uuid: id,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/v2/thread/order-entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
						swatch_approval_date:
							item.recipe_uuid === null
								? null
								: item.swatch_approval_date === null
									? getDateTime()
									: item.swatch_approval_date,
					};
					return updateData.mutateAsync({
						url: `/v2/thread/order-entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([order_info_promise, ...order_info_entries_promise])
					.then(() => form.reset(THREAD_ORDER_INFO_ENTRY_NULL))
					.then(() => {
						invalidateOrderInfoDetails();
						navigate(`/thread/order-info/${id}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		/* -------------------------------------------------------------------------- */
		/*                               ADD ORDER INFO                               */
		/* -------------------------------------------------------------------------- */
		const new_order_info_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create Shade Recipe description
		const order_info_data = {
			...values,
			// is_sample: values.is_sample ? 1 : 0,
			// is_bill: values.is_bill ? 1 : 0,
			// is_cash: values.is_cash ? 1 : 0,
			uuid: new_order_info_uuid,
			created_at,
			created_by,
		};

		// delete order_info_entry from data to be sent
		if ('order_info_entry' in order_info_data) {
			delete (order_info_data as { order_info_entry?: any })['order_info_entry'];
		}

		const order_info_promise = await postData.mutateAsync({
			url: threadOrderInfoUrl,
			newData: order_info_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const order_info_entries = [...values.order_info_entry].map((item) => ({
			...item,
			order_info_uuid: new_order_info_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const order_info_entries_promise = order_info_entries.map((item) =>
			postData.mutateAsync({
				url: '/v2/thread/order-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			await Promise.all([order_info_promise, ...order_info_entries_promise])
				.then(() => form.reset(THREAD_ORDER_INFO_ENTRY_NULL))
				.then(() => {
					invalidateOrderInfoDetails();
					navigate(`/thread/order-info/${new_order_info_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			bleaching: '',
			color: '',
			quantity: 0,
			remarks: '',
			style: '',
			count_length_uuid: '',
			company_price: 0,
			party_price: 0,
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].uuid,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('order_info_entry')[index];
		append({
			bleaching: field.bleaching,
			quantity: field.quantity,
			color: field.color,
			remarks: field.remarks,
			style: field.style,
			count_length_uuid: field.count_length_uuid,
			company_price: field.company_price,
			party_price: field.party_price,
		});
	};

	const [bleachAll, setBleachAll] = useState<boolean | null>();

	useEffect(() => {
		if (bleachAll !== null) {
			fields.forEach((item, index) => {
				form.setValue(`order_info_entry.${index}.bleaching`, bleachAll ? 'bleach' : 'non-bleach', {
					shouldDirty: true,
					shouldValidate: true,
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bleachAll, fields]);

	useEffect(() => {
		const subscription = form.watch((value) => {
			const { order_info_entry } = value;
			if (order_info_entry !== undefined && order_info_entry?.length > 0) {
				const allBleach = order_info_entry.every((item) => item?.bleaching === 'bleach');
				const allNonBleach = order_info_entry.every((item) => item?.bleaching === 'non-bleach');

				if (allBleach) {
					setBleachAll(true);
				} else if (allNonBleach) {
					setBleachAll(false);
				} else {
					setBleachAll(null);
				}
			}
		});
		return () => subscription.unsubscribe();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch]);

	const toggleBleaching = (
		<div className='flex items-center gap-2'>
			<label className='text-sm text-white'>Bleach All</label>
			<Switch
				className='data-[state=unchecked]:bg-destructive'
				checked={!!bleachAll}
				onCheckedChange={() => setBleachAll((prev) => !prev)}
			/>
		</div>
	);

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Order Info' : 'Add Order Info'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				extraHeader={toggleBleaching}
				viewAs='spreadsheet'
				title='Details'
				form={form}
				fieldName='order_info_entry'
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
						url: `/thread/order-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'order_info_entry',
								form
									.getValues('order_info_entry')
									.filter((item) => item.count_length_uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
