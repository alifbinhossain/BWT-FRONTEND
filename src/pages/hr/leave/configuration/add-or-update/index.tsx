import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IConfigurationTableData } from '../../_config/columns/columns.type';
import { useHrConfiguration, useHrConfigurationByUUID } from '../../_config/query';
import { ILeaveConfiguration, LEAVE_CONFIG_NULL, LEAVE_CONFIG_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: infoUrl, updateData, postData, deleteData } = useHrConfiguration();

	const { data } = useHrConfigurationByUUID<IConfigurationTableData>(uuid as string);

	const form = useRHF(LEAVE_CONFIG_SCHEMA, LEAVE_CONFIG_NULL);
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'configuration_entry',
	});
	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: ILeaveConfiguration) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */

		if (values.configuration_entry.length === 0) {
			ShowLocalToast({
				type: 'error',
				message: 'Please add at least one entry',
			});
			return;
		}
		if (isUpdate) {
			const infoData = {
				...values,
				submitted_by: 'employee',
				updated_at: getDateTime(),
			};
			if ('configuration_entry' in infoData) {
				delete (infoData as { configuration_entry?: any })['configuration_entry'];
			}

			const info_promise = await updateData.mutateAsync({
				url: `${infoUrl}/${uuid}`,
				updatedData: infoData,
				isOnCloseNeeded: false,
			});

			const order_entry_promise = values.configuration_entry.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						configuration_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/hr/configuration-entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/hr/configuration-entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([info_promise, ...order_entry_promise])
					.then(() => form.reset(LEAVE_CONFIG_NULL))
					.then(() => {
						navigate(`/hr/leave-configuration`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const configuration_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const infoData = {
			...values,
			uuid: configuration_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('configuration_entry' in infoData) {
			delete (infoData as { configuration_entry?: any })['configuration_entry'];
		}

		const info_promise = await postData.mutateAsync({
			url: infoUrl,
			newData: infoData,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const order_entry_entries = [...values.configuration_entry].map((item) => ({
			...item,
			configuration_uuid: configuration_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const order_entry_entries_promise = order_entry_entries.map((item) =>
			postData.mutateAsync({
				url: '/hr/configuration-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([info_promise, ...order_entry_entries_promise])
				.then(() => form.reset(LEAVE_CONFIG_NULL))
				.then(() => {
					navigate(`/hr/leave-configuration`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			uuid: undefined,
			leave_category_uuid: '',
			number_of_leaves_to_provide_file: 0,
			maximum_number_of_allowed_leaves: 0,
			consecutive_days: 0,
			maximum_number_of_leaves_to_carry: 0,
			count_off_days_as_leaves: false,
			enable_previous_day_selection: false,
			maximum_number_of_leave_per_month: 0,
			previous_date_selected_limit: 0,
			applicability: 'both',
			eligible_after_joining: 0,
			enable_pro_rata: false,
			leave_carry_type: 'fixed_amount',
			max_avail_time: 0,
			enable_earned_leave: false,
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
				name: `Entry ${index + 1}`,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('configuration_entry')[index];
		append({
			uuid: field.uuid,
			leave_category_uuid: field.leave_category_uuid,
			number_of_leaves_to_provide_file: field.number_of_leaves_to_provide_file,
			maximum_number_of_allowed_leaves: field.maximum_number_of_allowed_leaves,
			consecutive_days: field.consecutive_days,
			maximum_number_of_leaves_to_carry: field.maximum_number_of_leaves_to_carry,
			count_off_days_as_leaves: field.count_off_days_as_leaves,
			enable_previous_day_selection: field.enable_previous_day_selection,
			maximum_number_of_leave_per_month: field.maximum_number_of_leave_per_month,
			previous_date_selected_limit: field.previous_date_selected_limit,
			applicability: field.applicability,
			eligible_after_joining: field.eligible_after_joining,
			enable_pro_rata: field.enable_pro_rata,
			max_avail_time: field.max_avail_time,
			enable_earned_leave: field.enable_earned_leave,
			leave_carry_type: field.leave_carry_type,
		});
	};
	const fieldDefs = useGenerateFieldDefs({
		copy: handleCopy,
		remove: handleRemove,
		watch: form.watch,
		form: form,
	});
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Configuration' : ' Add New Configuration'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header isUpdate={isUpdate} />

			<CoreForm.DynamicFields
				viewAs='kanban'
				title='Categories List'
				className='2xl:grid-cols-2'
				form={form}
				fieldName='configuration_entry'
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
								'configuration_entry',
								form.getValues('configuration_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
