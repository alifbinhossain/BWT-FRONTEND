import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherEmployees } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrEmployeeFieldVisitInfoByUUID, useHrFieldVisit, useHrFieldVisitByUUID } from '../../_config/query';
import { FIELD_VISIT_NULL, FIELD_VISIT_SCHEMA, IFieldVisit } from '../../_config/schema';
import { IFieldVisitEmployee } from '../../_config/types';
import EmployeeInformation from '../employee-information';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const { updateData, postData } = useHrFieldVisit();

	const { data, invalidateQuery: invalidateFieldVisit } = useHrFieldVisitByUUID<IFieldVisit>(uuid as string);

	const { data: employees } = useOtherEmployees<IFormSelectOption[]>();

	const form = useRHF(FIELD_VISIT_SCHEMA, FIELD_VISIT_NULL);

	const { data: employeeInfo } = useHrEmployeeFieldVisitInfoByUUID<IFieldVisitEmployee>(
		form.watch('employee_uuid') as string
	);

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
					url: `/hr/manual-entry/${uuid}`,
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
		<div className='grid grid-cols-1 gap-8 xl:grid-cols-5'>
			<div className='col-span-1 xl:col-span-2'>
				<CoreForm.AddEditWrapper
					title={isUpdate ? 'Edit Field Visit' : 'Add Field Visit'}
					form={form}
					onSubmit={onSubmit}
				>
					<div>
						<h1 className='font-semibold'>Apply Field Visit</h1>
						<Separator className='mt-3' />
					</div>

					<FormField
						control={form.control}
						name='employee_uuid'
						render={(props) => (
							<CoreForm.ReactSelect label='Employee' options={employees || []} {...props} />
						)}
					/>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='entry_time'
							render={(props) => (
								<CoreForm.DateTimePicker
									calendarProps={{
										disabled: (date) => {
											const exitTime = new Date(form.watch('exit_time') as string);
											return date > exitTime;
										},
									}}
									{...props}
								/>
							)}
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
					<FormField
						control={form.control}
						name='reason'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
					<FormField control={form.control} name='area' render={(props) => <CoreForm.Input {...props} />} />
				</CoreForm.AddEditWrapper>
			</div>

			<div className='colspan-1 xl:col-span-3'>
				{employeeInfo ? (
					<EmployeeInformation data={employeeInfo} />
				) : (
					<div className='flex size-full items-center justify-center rounded-md border bg-base-200 p-4 text-center'>
						<p>Select an employee to see their information</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddOrUpdate;
