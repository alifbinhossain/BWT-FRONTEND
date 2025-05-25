import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';
import { IFieldVisitEmployee } from '@/pages/hr/_config/types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormField } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherEmployees, useOtherLeaveCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useHrApplyLeave, useHrApplyLeaveByUUID, useHrEmployeeLeaveDetails } from '../../_config/query';
import { ILeaveApply, LEAVE_APPLY_NULL, LEAVE_APPLY_SCHEMA } from '../../_config/schema';
import EmployeeInformation from '../employee-information';
import { type } from './utills';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const { imageUpdateData, imagePostData } = useHrApplyLeave();

	const { data, invalidateQuery: invalidateFieldVisit } = useHrApplyLeaveByUUID<ILeaveApply>(uuid as string);

	const { data: employees } = useOtherEmployees<IFormSelectOption[]>();
	const { data: LeaveCategoryOption } = useOtherLeaveCategory<IFormSelectOption[]>();

	const form = useRHF(LEAVE_APPLY_SCHEMA, LEAVE_APPLY_NULL);

	const { data: employeeInfo } = useHrEmployeeLeaveDetails<IFieldVisitEmployee>(
		form.watch('employee_uuid') as string
	);

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: ILeaveApply) {
		const formData = Formdata<ILeaveApply>(values);
		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			imageUpdateData
				.mutateAsync({
					url: `/hr/apply-leave/${uuid}`,
					updatedData: formData,
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
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());
			imagePostData
				.mutateAsync({
					url: `/hr/apply-leave`,
					newData: formData,
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
					title={isUpdate ? 'Edit Apply Leave' : 'Add Apply Leave'}
					form={form}
					onSubmit={onSubmit}
				>
					<div>
						<h1 className='font-semibold'>Leave Application</h1>
						<Separator className='mt-3' />
					</div>
					<FormField
						control={form.control}
						name='year'
						render={(props) => <CoreForm.Input label='Year' {...props} />}
					/>
					<FormField
						control={form.control}
						name='employee_uuid'
						render={(props) => (
							<CoreForm.ReactSelect label='Employee' options={employees || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='leave_category_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Leave Category'
								options={LeaveCategoryOption || []}
								{...props}
							/>
						)}
					/>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='type'
							render={(props) => <CoreForm.ReactSelect label='Type' options={type || []} {...props} />}
						/>
					</div>

					<FormField
						control={form.control}
						name='from_date'
						render={(props) => <CoreForm.DatePicker label='From Date' {...props} />}
					/>
					<FormField
						control={form.control}
						name='to_date'
						render={(props) => <CoreForm.DatePicker label='To Date' {...props} />}
					/>
					<FormField
						control={form.control}
						name='reason'
						render={(props) => <CoreForm.Textarea label='Reason' {...props} />}
					/>
					<FormField
						control={form.control}
						name='file'
						render={(props) => <CoreForm.FileUpload fileType='document' isUpdate={isUpdate} {...props} />}
					/>
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
