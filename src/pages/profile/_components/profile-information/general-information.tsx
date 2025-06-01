import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherDepartment,
	useOtherDesignation,
	useOtherEmploymentType,
	useOtherHrManager,
	useOtherLeavePolicy,
	useOtherLineManager,
	useOtherShiftGroup,
	useOtherSubDepartment,
	useOtherWorkplace,
} from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { IEmployeeDetails } from '../../config/types';
import { GENERAL_INFO_NULL, GENERAL_INFO_SCHEMA, IGeneralInfo } from './_config/schema';

export function GeneralInformation({
	data,
	updateData,
}: {
	data: IEmployeeDetails;
	updateData: UseMutationResult<
		IResponse<IEmployeeDetails>,
		AxiosError<IResponse<IEmployeeDetails>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}) {
	const { data: departments } = useOtherDepartment<IFormSelectOption[]>();
	const { data: subDepartments } = useOtherSubDepartment<IFormSelectOption[]>();
	const { data: designations } = useOtherDesignation<IFormSelectOption[]>();
	const { data: workplaces } = useOtherWorkplace<IFormSelectOption[]>();
	const { data: leavePolicies } = useOtherLeavePolicy<IFormSelectOption[]>();
	const { data: employmentTypes } = useOtherEmploymentType<IFormSelectOption[]>();
	const { data: shiftGroups } = useOtherShiftGroup<IFormSelectOption[]>();
	const { data: lineManagers } = useOtherLineManager<IFormSelectOption[]>();
	const { data: hrManagers } = useOtherHrManager<IFormSelectOption[]>();

	const form = useRHF(GENERAL_INFO_SCHEMA, GENERAL_INFO_NULL);

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	async function onSubmit(values: IGeneralInfo) {
		console.log({ values });
		// UPDATE ITEM
		await updateData.mutateAsync({
			url: `/hr/employee/${data?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
			},
			isOnCloseNeeded: false,
		});
	}

	return (
		<div className='px-4 py-4'>
			<CoreForm.AddEditWrapper form={form} onSubmit={onSubmit}>
				<div className='grid w-full grid-cols-2 gap-4'>
					<FormField
						disabled
						name='employee_name'
						control={form.control}
						render={(props) => <CoreForm.Input label='Name' {...props} />}
					/>
					<FormField
						control={form.control}
						name='employee_id'
						render={(props) => <CoreForm.Input label='ID' {...props} />}
					/>
					<FormField
						disabled
						name='email'
						control={form.control}
						render={(props) => <CoreForm.Input {...props} />}
					/>
					<FormField
						control={form.control}
						name='department_uuid'
						render={(props) => (
							<CoreForm.Select label='Department' options={departments || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='sub_department_uuid'
						render={(props) => (
							<CoreForm.Select label='Sub Department' options={subDepartments || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='designation_uuid'
						render={(props) => (
							<CoreForm.Select label='Designation' options={designations || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='employment_type_uuid'
						render={(props) => (
							<CoreForm.Select label='Employment Type' options={employmentTypes || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='shift_group_uuid'
						render={(props) => (
							<CoreForm.Select label='Shift Group' options={shiftGroups || []} {...props} />
						)}
					/>

					<FormField
						control={form.control}
						name='gender'
						render={(props) => <CoreForm.Gender {...props} />}
					/>

					<FormField
						control={form.control}
						name='primary_display_text'
						render={(props) => <CoreForm.Input label='Primary Display Text' {...props} />}
					/>

					<FormField
						control={form.control}
						name='secondary_display_text'
						render={(props) => <CoreForm.Input label='Secondary Display Text' {...props} />}
					/>

					<FormField
						control={form.control}
						name='rfid'
						render={(props) => <CoreForm.Input label='RFID' {...props} />}
					/>
					<FormField
						control={form.control}
						name='report_position'
						render={(props) => <CoreForm.Input {...props} />}
					/>

					<FormField
						control={form.control}
						name='leave_policy_uuid'
						render={(props) => (
							<CoreForm.Select label='Leave Policy' options={leavePolicies || []} {...props} />
						)}
					/>

					<FormField
						control={form.control}
						name='start_date'
						render={(props) => <CoreForm.DatePicker label='Joining Date' {...props} />}
					/>

					<FormField
						control={form.control}
						name='end_date'
						render={(props) => <CoreForm.DatePicker {...props} />}
					/>

					<FormField
						control={form.control}
						name='workplace_uuid'
						render={(props) => <CoreForm.Select label='Workplace' options={workplaces || []} {...props} />}
					/>
					<FormField
						control={form.control}
						name='line_manager_uuid'
						render={(props) => (
							<CoreForm.Select label='Line Manager' options={lineManagers || []} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='hr_manager_uuid'
						render={(props) => <CoreForm.Select label='HR Manager' options={hrManagers || []} {...props} />}
					/>
				</div>
			</CoreForm.AddEditWrapper>
		</div>
	);
}
