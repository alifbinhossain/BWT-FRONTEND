import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import { useOtherUserByQuery } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IInfoTableData } from './_config/columns/columns.type';
import { useWorkInfo, useWorkInfoByUUID } from './_config/query';
import { IInfo, INFO_NULL, INFO_SCHEMA } from './_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: infoUrl, postData, deleteData } = useWorkInfo();
	const { invalidateQuery: invalidateCustomer } = useOtherUserByQuery<IFormSelectOption[]>('?type=customer');

	const { data } = useWorkInfoByUUID<IInfoTableData>(uuid as string);

	const form = useRHF(INFO_SCHEMA, INFO_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'order_entry',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset({
				...data,
				order_entry: Array.isArray(data.order_entry)
					? data.order_entry
					: data.order_entry
						? [data.order_entry]
						: [],
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IInfo) {
		if (values.order_entry.length === 0) {
			ShowLocalToast({
				type: 'error',
				message: 'Please add at least one order entry',
			});
			return;
		}

		const info_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const infoData = {
			...values,
			submitted_by: 'customer',
			uuid: info_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('order_entry' in infoData) {
			delete (infoData as { order_entry?: any })['order_entry'];
		}

		const info_promise = await postData.mutateAsync({
			url: infoUrl,
			newData: infoData,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const order_entry_entries = [...values.order_entry].map((item) => ({
			...item,
			info_uuid: info_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const order_entry_entries_promise = order_entry_entries.map((item) =>
			postData.mutateAsync({
				url: '/work/order',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([info_promise, ...order_entry_entries_promise])
				.then(() => form.reset(INFO_NULL))
				.then(() => {
					invalidateCustomer();
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			is_diagnosis_need: false,
			model_uuid: '',
			size_uuid: '',
			quantity: 0,
			serial_no: '',
			problems_uuid: [],
			problem_statement: '',
			accessories: [],
			warehouse_uuid: null,
			rack_uuid: null,
			floor_uuid: null,
			box_uuid: null,
			remarks: null,
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const modelName: string = String(form.getValues('order_entry')[index].model_id);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: modelName,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('order_entry')[index];
		append({
			is_diagnosis_need: field.is_diagnosis_need,
			model_uuid: field.model_uuid,
			serial_no: field.serial_no,
			quantity: field.quantity,
			problems_uuid: field.problems_uuid,
			problem_statement: field.problem_statement,
			accessories: field.accessories,
			warehouse_uuid: field.warehouse_uuid,
			rack_uuid: field.rack_uuid,
			floor_uuid: field.floor_uuid,
			box_uuid: field.box_uuid,
			remarks: field.remarks,
		});
	};

	const fieldDefs = useGenerateFieldDefs({
		copy: handleCopy,
		remove: handleRemove,
		watch: form.watch,
		form: form,
	});
	return (
		<div className='container my-6 w-full px-2 sm:mx-auto lg:my-12 lg:max-w-[840px] lg:px-0'>
			<h1 className='mb-2.5 text-center text-2xl font-bold text-primary md:text-3xl lg:mb-6'>
				Customer Order Form
			</h1>

			<CoreForm.AddEditWrapper
				title={isUpdate ? 'Edit Order Entry' : ' Add Order Entry'}
				form={form}
				onSubmit={onSubmit}
			>
				<Header />
				<CoreForm.DynamicFields
					containerClassName='p-2 lg:p-4'
					className='2xl:grid-cols-2'
					viewAs='kanban'
					title={'Order Details'}
					form={form}
					fieldName='order_entry'
					fieldDefs={fieldDefs}
					handleAdd={handleAdd}
					fields={fields}
				/>
				<Suspense fallback={null}>
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: `/work/order`,
							deleteData,
							onClose: () => {
								form.setValue(
									'order_entry',
									form.getValues('order_entry').filter((item) => item.uuid !== deleteItem?.id)
								);
							},
						}}
					/>
				</Suspense>
			</CoreForm.AddEditWrapper>
		</div>
	);
};

export default AddOrUpdate;
