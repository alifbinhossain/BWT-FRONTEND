import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useWorkGetTransferSection, useWorkProcesses } from '../../_config/query';
import { IWorkTransfer, TRANSFER_PROCESS_SECTION_NULL, TRANSFER_PROCESS_SECTION_SCHEMA } from '../../_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { diagnosis_uuid, order_uuid } = useParams();
	const isUpdate = true;
	const { url: ProcessTransferUrl, updateData, postData, deleteData } = useWorkProcesses();

	const { data } = useWorkGetTransferSection(order_uuid || '');

	const form = useRHF(TRANSFER_PROCESS_SECTION_SCHEMA, TRANSFER_PROCESS_SECTION_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'entry',
	});
	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IWorkTransfer) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const entry_promise = values.entry.map((item, index) => {
				if (item.uuid === undefined || item.uuid === null) {
					const newData = {
						...item,
						diagnosis_uuid: diagnosis_uuid !== 'null' ? diagnosis_uuid : null,
						order_uuid: diagnosis_uuid === 'null' ? order_uuid : null,
						index: index + 1,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};
				
					return postData.mutateAsync({
						url: ProcessTransferUrl,
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						diagnosis_uuid: diagnosis_uuid !== 'null' ? diagnosis_uuid : null,
						order_uuid: diagnosis_uuid === 'null' ? null : order_uuid,
						index: index + 1,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `${ProcessTransferUrl}/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([...entry_promise])
					.then(() => form.reset(TRANSFER_PROCESS_SECTION_NULL))
					.then(() => {
						// invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/work/order/details/${order_uuid}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		// Create purchase entries

		const entry_entries_promise = values.entry.map((item, index) => {
			const newData = {
				...item,
				diagnosis_uuid: diagnosis_uuid,
				index: index,
				
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};
		
			return postData.mutateAsync({
				url: ProcessTransferUrl,
				newData: newData,
				isOnCloseNeeded: false,
			});
		});

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([...entry_entries_promise])
				.then(() => form.reset(TRANSFER_PROCESS_SECTION_NULL))
				.then(() => {
					// invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/work/order/details/${order_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			section_uuid: '',
			remarks: '',
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
		const field = form.watch('entry')[index];
		append({
			section_uuid: field.section_uuid,
			remarks: field.remarks,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Transfer Section' : 'Add Transfer Section'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.DynamicFields
				title='Transfer Section'
				form={form}
				fieldName='entry'
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
						url: `/work/process`,
						deleteData,
						onClose: () => {
							form.setValue(
								'entry',
								form.getValues('entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
