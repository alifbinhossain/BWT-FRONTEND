import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherFloor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IJobTableData } from '../_config/columns/columns.type';
import { useWorkJobsByUUID } from '../_config/query';
import { JOB_NULL, JOB_SCHEMA } from '../_config/schema';
import { IJobAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IJobAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useWorkJobsByUUID<IJobTableData>(updatedData?.uuid as string);
	const { data: userOption } = useOtherFloor<IFormSelectOption[]>();

	const form = useRHF(JOB_SCHEMA, JOB_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(JOB_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IJobTableData) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.job_id} Job` : 'Add New Job'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='user_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='User' placeholder='Select User' options={userOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='model_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Model' placeholder='Select Model' options={userOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='size_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Size' placeholder='Select Size' options={userOption!} {...props} />
				)}
			/>
			<FormField control={form.control} name='serial_no' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='problem_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti={true}
						label='Problem'
						placeholder='Select Problems'
						options={userOption!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='problem_statement'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
			<FormField control={form.control} name='accessories' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField
				control={form.control}
				name='is_product_received'
				render={(props) => <CoreForm.Checkbox {...props} />}
			/>
			<FormField
				control={form.control}
				name='receive_date'
				render={(props) => <CoreForm.DatePicker {...props} />}
			/>
			<FormField
				control={form.control}
				name='rack_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti={true}
						label='Rack'
						placeholder='Select Racks'
						options={userOption!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='floor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti={true}
						label='Floor'
						placeholder='Select Floors'
						options={userOption!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='box_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti={true}
						label='Box'
						placeholder='Select Boxes'
						options={userOption!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
