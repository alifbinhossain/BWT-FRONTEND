import { lazy, Suspense, useEffect, useState } from 'react';
import { useWorkOrderByCustomerUUID } from '@/pages/work/_config/query';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useDeliveryChallan, useDeliveryChallanByUUID } from '../../_config/query';
import { CHALLAN_NULL, CHALLAN_SCHEMA, IChallan } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: challanUrl, updateData, postData, deleteData } = useDeliveryChallan();

	const { data, invalidateQuery: invalidateTestDetails } = useDeliveryChallanByUUID(uuid as string);

	const form = useRHF(CHALLAN_SCHEMA, CHALLAN_NULL);
	const { data: order } = useWorkOrderByCustomerUUID(form.watch('customer_uuid'));

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'challan_entries',
	});
	const {
		fields: newFields,
		append: appendNew,
		remove: removeNew,
	} = useFieldArray({
		control: form.control,
		name: 'new_challan_entries',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	useEffect(() => {
		if (Array.isArray(order)) {
			order.map((item: any) => {
				item['order_uuid'] = item.uuid;
				delete item.uuid;
			});
			form.setValue('new_challan_entries', order as any);
		} else {
			form.setValue('new_challan_entries', []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order, isUpdate]);

	const challanType = form.watch('challan_type');

	useEffect(() => {
		if (challanType === 'customer_pickup') {
			form.setValue('employee_uuid', null);
			form.setValue('vehicle_uuid', null);
			form.setValue('courier_uuid', null);
		} else if (challanType === 'courier_delivery') {
			form.setValue('employee_uuid', null);
			form.setValue('vehicle_uuid', null);
		} else if (challanType === 'employee_delivery') {
			form.setValue('vehicle_uuid', null);
			form.setValue('courier_uuid', null);
		} else if (challanType === 'vehicle_delivery') {
			form.setValue('courier_uuid', null);
		}
	}, [challanType, form, isUpdate]);

	async function onSubmit(values: IChallan) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const challan_data = {
				...values,
				updated_at: getDateTime(),
			};

			const challan_promise = await updateData.mutateAsync({
				url: `${challanUrl}/${uuid}`,
				updatedData: challan_data,
				isOnCloseNeeded: false,
			});

			const challan_entries_promise = values.challan_entries.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						challan_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/delivery/challan-entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/delivery/challan-entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([challan_promise, ...challan_entries_promise])
					.then(() => form.reset(CHALLAN_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/delivery/challan/details/${uuid}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const new_challan_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const challan_data = {
			...values,
			uuid: new_challan_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('challan_entries' in challan_data) {
			delete (challan_data as { challan_entries?: any })['challan_entries'];
		}

		const challan_promise = await postData.mutateAsync({
			url: challanUrl,
			newData: challan_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const challan_entries_entries = [...values.challan_entries].map((item) => ({
			...item,
			challan_uuid: new_challan_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const challan_entries_entries_promise = challan_entries_entries.map((item) =>
			postData.mutateAsync({
				url: '/delivery/challan-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([challan_promise, ...challan_entries_entries_promise])
				.then(() => form.reset(CHALLAN_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/delivery/challan/details/${new_challan_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			appendNew(fields[index] as any);
			setDeleteItem({
				id: fields[index].uuid,
				name: String(fields[index].order_id),
			});
		} else {
			remove(index);
			appendNew(fields[index] as any);
		}
	};
	const handleAdd = (index: number) => {
		append(newFields[index] as any);
		removeNew(index);
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Challan Entry' : ' Add Challan Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.DynamicFields
				title='Ready For Delivery'
				form={form}
				fieldName='new_challan_entries'
				fieldDefs={useGenerateFieldDefs({
					entry: 'new_challan_entries',
					remove: handleRemove,
					add: handleAdd,
					watch: form.watch,
				})}
				fields={newFields}
			/>

			<Header challan_uuid={uuid || ''} />
			<CoreForm.DynamicFields
				title='Challan Entry'
				form={form}
				fieldName='challan_entries'
				fieldDefs={useGenerateFieldDefs({
					entry: 'challan_entries',
					remove: handleRemove,
					add: handleAdd,
					watch: form.watch,
				})}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/delivery/challan-entry`,
						deleteData,
						needRefresh: true,
						onClose: () => {
							form.setValue(
								'challan_entries',
								form.getValues('challan_entries').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
