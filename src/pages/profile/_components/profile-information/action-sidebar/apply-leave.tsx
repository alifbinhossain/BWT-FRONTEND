import { useState } from 'react';
import { status } from '@/pages/hr/field-visit/utils';
import { useHrApplyLeave } from '@/pages/hr/leave/_config/query';
import { ILeaveApply, LEAVE_APPLY_NULL, LEAVE_APPLY_SCHEMA } from '@/pages/hr/leave/_config/schema';
import { type } from '@/pages/hr/leave/apply-leave/add-or-update/utils';
import { differenceInDays, format } from 'date-fns';
import { Calendar } from 'lucide-react';
import useProfile from '@/hooks/useProfile';
import useRHF from '@/hooks/useRHF';

import { AddModal } from '@/components/core/modal';
import { ShowLocalToast } from '@/components/others/toast';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherEmployees, useOtherLeaveCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

interface ICustomEmployeeSelectOption extends IFormSelectOption {
	policy: [
		{
			name: string;
			balance: number;
		},
	];
}

const ApplyForLeave = () => {
	const [open, setOpen] = useState(false);

	const { user, profileData } = useProfile();
	const { imagePostData } = useHrApplyLeave();
	const { data: employees } = useOtherEmployees<ICustomEmployeeSelectOption[]>(`leave_policy_required=true`);

	const form = useRHF(LEAVE_APPLY_SCHEMA, { ...LEAVE_APPLY_NULL, employee_uuid: profileData?.uuid });

	const { data: LeaveCategoryOption } = useOtherLeaveCategory<IFormSelectOption[]>(
		`employee_uuid=${form.watch('employee_uuid')}`
	);

	const onClose = () => {
		form.reset({
			...LEAVE_APPLY_NULL,
			employee_uuid: profileData?.uuid,
		});
		setOpen((prev) => !prev);
	};

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
		formData.append('created_at', getDateTime());
		formData.append('created_by', user?.uuid || '');
		formData.append('uuid', nanoid());
		imagePostData
			.mutateAsync({
				url: `/hr/apply-leave`,
				newData: formData,
				isOnCloseNeeded: false,
			})
			.then((res) => {})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant={'outline'}
				className={`h-auto w-full justify-start px-4 py-2`}
			>
				<Calendar className='mr-1 size-4' />
				<span className='text-sm'>Apply for Leave</span>
			</Button>

			<AddModal open={open} setOpen={onClose} title={'Apply for Leave'} form={form} onSubmit={onSubmit}>
				<FormField
					control={form.control}
					name='year'
					render={(props) => <CoreForm.Input label='Year' {...props} />}
				/>
				<FormField
					control={form.control}
					name='approval'
					render={(props) => <CoreForm.ReactSelect label='Status' options={status || []} {...props} />}
				/>
				<div className='grid grid-cols-2 gap-4'>
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

					<FormField
						control={form.control}
						name='type'
						render={(props) => <CoreForm.ReactSelect label='Type' options={type || []} {...props} />}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4'>
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
				</div>
				<FormField
					control={form.control}
					name='reason'
					render={(props) => <CoreForm.Textarea label='Reason' {...props} />}
				/>
				<FormField
					control={form.control}
					name='file'
					render={(props) => <CoreForm.FileUpload fileType='document' {...props} />}
				/>
			</AddModal>
		</>
	);
};

export default ApplyForLeave;
