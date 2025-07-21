import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useStorePurchases } from '../../_config/query';
import { ITransfer, TRANSFER_NULL, TRANSFER_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { postData, deleteData } = useStorePurchases();

	const form = useRHF(TRANSFER_SCHEMA, TRANSFER_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'serials',
	});

	async function onSubmit(values: ITransfer) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (values.serials.length === 0) {
			ShowLocalToast({
				type: 'error',
				message: 'Please add at least one entry',
			});
			return;
		}

		const new_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// delete purchase field from data to be sent

		// Create purchase entries
		const serials_entries = [...values.serials].map((item) => ({
			...item,
			purchase_entry_uuid: item.uuid,
			order_uuid: values?.order_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const serials_entries_promise = serials_entries.map((item) =>
			postData.mutateAsync({
				url: '/store/purchase-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			await Promise.all([...serials_entries_promise])
				.then(() => form.reset(TRANSFER_NULL))
				.then(() => {
					navigate(`/store/product/`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			purchase_entry_uuid: '',
			remarks: '',
		});
	};

	// Delete Handler
	const handleRemove = (index: number) => {
		remove(index);
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('serials')[index];
		append({
			purchase_entry_uuid: field.purchase_entry_uuid,
			remarks: field.remarks,
		});
	};
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Order Transfer Entry' : ' Add Order Transfer Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='serials'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
				})}
				handleAdd={handleAdd}
				fields={fields}
			></CoreForm.DynamicFields>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
