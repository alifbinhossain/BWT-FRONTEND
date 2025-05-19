import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherEmployees } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrFieldVisit, useHrFieldVisitByUUID } from '../../_config/query';
import { FIELD_VISIT_NULL, FIELD_VISIT_SCHEMA, IFieldVisit } from '../../_config/schema';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams();
	const isUpdate = !!id;

	const { updateData, postData } = useHrFieldVisit();

	const { data, invalidateQuery: invalidateFieldVisit } = useHrFieldVisitByUUID<IFieldVisit>(id as string);

	const { data: employees } = useOtherEmployees<IFormSelectOption[]>();

	const form = useRHF(FIELD_VISIT_SCHEMA, FIELD_VISIT_NULL);

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IFieldVisit) {
		if (isUpdate) {
			updateData
				.mutateAsync({
					url: `/hr/manual-entry/${id}`,
					updatedData: {
						...values,
						updated_at: getDateTime(),
						type: 'field_visit',
					},
					isOnCloseNeeded: false,
				})
				.then((res) => {
					if (res) {
						invalidateFieldVisit();
						navigate(`/hr/field-visit`);
					}
				})
				.catch((err) => {
					console.error(err);
				});
			return;
		} else {
			postData
				.mutateAsync({
					url: `/hr/manual-entry`,
					newData: {
						...values,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
						type: 'field_visit',
					},
					isOnCloseNeeded: false,
				})
				.then((res) => {
					if (res) {
						invalidateFieldVisit();
						navigate(`/hr/field-visit`);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Field Visit' : 'Add Field Visit'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='employee_uuid'
				render={(props) => <CoreForm.ReactSelect label='Employee' options={employees || []} {...props} />}
			/>

			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='entry_time'
					render={(props) => <CoreForm.DateTimePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='exit_time'
					render={(props) => (
						<CoreForm.DateTimePicker
							calendarProps={{
								disabled: (date) => {
									const entryDate = new Date(form.watch('entry_time') as string);
									return date < entryDate;
								},
							}}
							{...props}
						/>
					)}
				/>
			</div>
			<FormField control={form.control} name='reason' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='area' render={(props) => <CoreForm.Input {...props} />} />
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
