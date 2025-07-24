import { lazy, Suspense, useEffect, useState } from 'react';
import { ICustomWarehouseSelectOption } from '@/pages/work/order/details/transfer/utills';
import { floor } from 'lodash';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import { useOtherWarehouseByQuery } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IProductTableData } from '../../_config/columns/columns.type';
import { useStoreProducts, useStorePurchases } from '../../_config/query';
import { IInternalTransfer, INTERNAL_TRANSFER_NULL, INTERNAL_TRANSFER_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { postData, updateData, deleteData } = useStorePurchases();
	const { invalidateQuery: invalidateStoreProducts } = useStoreProducts<IProductTableData[]>();
	const { invalidateQuery: invalidWarehouseQuery } = useOtherWarehouseByQuery<ICustomWarehouseSelectOption[]>(
		`product_uuid=${uuid ?? ''}`
	);

	const form = useRHF(INTERNAL_TRANSFER_SCHEMA, INTERNAL_TRANSFER_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'serials',
	});

	async function onSubmit(values: IInternalTransfer) {
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
			purchase_entry_uuid: item.purchase_entry_uuid,
			from_warehouse_uuid: values?.from_warehouse_uuid,
			to_warehouse_uuid: values?.to_warehouse_uuid,
			rack_uuid: values?.rack_uuid,
			floor_uuid: values?.floor_uuid,
			box_uuid: values?.box_uuid,
			remarks: item.remarks,
			quantity: 1,
			uuid: new_uuid,
			created_at,
			created_by,
		}));

		const serials_entries_promise = serials_entries.map((item) =>
			postData.mutateAsync({
				url: '/store/internal-transfer',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			await Promise.all([...serials_entries_promise])
				.then(() => form.reset(INTERNAL_TRANSFER_NULL))
				.then(() => {
					navigate(`/store/product/`);
					invalidWarehouseQuery();
					invalidateStoreProducts();
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
			<Header product_uuid={uuid ?? ''} />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='serials'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
					warehouse_uuid: form.watch('from_warehouse_uuid'),
				})}
				handleAdd={handleAdd}
				fields={fields}
			></CoreForm.DynamicFields>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
