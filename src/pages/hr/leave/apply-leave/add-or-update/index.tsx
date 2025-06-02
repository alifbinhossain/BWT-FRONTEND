import { useEffect } from 'react';
import { status } from '@/pages/hr/field-visit/utils';
import { differenceInDays, format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
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
import { ILeaveEmployee } from '../../_config/types';
import EmployeeInformation from '../employee-information';
import LastFiveLeaveApplications from '../last_five_leave_applications';
import { type } from './utils';

interface ICustomEmployeeSelectOption extends IFormSelectOption {
	policy: [
		{
			name: string;
			balance: number;
		},
	];
}

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const { imageUpdateData, imagePostData } = useHrApplyLeave();

	const { data, invalidateQuery: invalidateFieldVisit } = useHrApplyLeaveByUUID<ILeaveApply>(uuid as string);

	const { data: employees } = useOtherEmployees<ICustomEmployeeSelectOption[]>(`leave_policy_required=true`);
	const disabled = data?.approval === 'approved' || data?.approval === 'rejected' ? true : false;

	const form = useRHF(LEAVE_APPLY_SCHEMA, LEAVE_APPLY_NULL);
	const { data: LeaveCategoryOption } = useOtherLeaveCategory<IFormSelectOption[]>(
		`employee_uuid=${form.watch('employee_uuid')}`
	);

	const { data: employeeInfo } = useHrEmployeeLeaveDetails<ILeaveEmployee>(
		form.watch('employee_uuid') as string,
		uuid as string
	);

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: ILeaveApply) {
		const format_from_date = values?.from_date ? format(values?.from_date, 'dd MMM yyyy') : '';
		const format_to_date = values?.to_date ? format(values?.to_date, 'dd MMM yyyy') : '';
		const days = differenceInDays(format_to_date, format_from_date) + 1;
		const employee = employees?.find((e) => e.value === values?.employee_uuid);
		const category = LeaveCategoryOption?.find((e) => e.value === values?.leave_category_uuid)?.label;
		const balance = employee?.policy.find((e) => e.name === category)?.balance;
		if (balance && balance < days) {
			return ShowLocalToast({
				type: 'error',
				message: `You have ${balance} days of leave balance, but you want ${days} days of leave`,
			});
		}
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
						navigate(`/hr/apply-leave`);
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
						navigate(`/hr/apply-leave`);
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
					isSubmitDisable={data?.approval === 'approved'}
				>
					<div>
						<h1 className='font-semibold'>Leave Application</h1>
						<Separator className='mt-3' />
					</div>
					<FormField
						control={form.control}
						name='year'
						render={(props) => <CoreForm.Input label='Year' disabled={disabled} {...props} />}
					/>
					<FormField
						control={form.control}
						name='employee_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Employee'
								isDisabled={disabled}
								options={employees || []}
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='approval'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Status'
								isDisabled={disabled}
								options={status || []}
								{...props}
							/>
						)}
					/>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='leave_category_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Leave Category'
									isDisabled={disabled}
									options={LeaveCategoryOption || []}
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='type'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Type'
									options={type || []}
									isDisabled={disabled}
									{...props}
								/>
							)}
						/>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='from_date'
							render={(props) => <CoreForm.DatePicker label='From Date' disabled={disabled} {...props} />}
						/>
						<FormField
							control={form.control}
							name='to_date'
							render={(props) => <CoreForm.DatePicker label='To Date' disabled={disabled} {...props} />}
						/>
					</div>
					<FormField
						control={form.control}
						name='reason'
						render={(props) => <CoreForm.Textarea label='Reason' disabled={disabled} {...props} />}
					/>
					<FormField
						control={form.control}
						name='file'
						render={(props) => (
							<CoreForm.FileUpload
								fileType='document'
								isUpdate={isUpdate}
								disabled={disabled}
								{...props}
							/>
						)}
					/>
				</CoreForm.AddEditWrapper>
			</div>

			<div className='colspan-1 xl:col-span-3'>
				{employeeInfo ? (
					<div>
						<EmployeeInformation data={employeeInfo} />
						<Separator className='my-4' />
						<LastFiveLeaveApplications data={employeeInfo} />
					</div>
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
