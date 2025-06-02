import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';

import {
	useOtherEmploymentType,
	useOtherLeavePolicy,
	useOtherShiftGroup,
	useOtherSubDepartment,
	useOtherUserByQuery,
	useOtherWorkplace,
} from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrEmployeesByUUID } from '../_config/query';
import { EMPLOYEE_NULL, EMPLOYEE_SCHEMA, IEmployee } from './_config/schema';
import { IEmployeeAddOrUpdateProps } from './_config/types';

const AddOrUpdate: React.FC<IEmployeeAddOrUpdateProps> = ({
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
	const { data } = useHrEmployeesByUUID(updatedData?.uuid as string);

	const { data: subDepartments } = useOtherSubDepartment<IFormSelectOption[]>();
	const { data: workplaces } = useOtherWorkplace<IFormSelectOption[]>();
	const { data: leavePolicies } = useOtherLeavePolicy<IFormSelectOption[]>();
	const { data: employmentTypes } = useOtherEmploymentType<IFormSelectOption[]>();
	const { data: shiftGroups } = useOtherShiftGroup<IFormSelectOption[]>();

	const form = useRHF(EMPLOYEE_SCHEMA as any, EMPLOYEE_NULL);

	console.log({
		error: form.formState.errors,
	});
	const { data: usersOptions } = useOtherUserByQuery<IFormSelectOption[]>(
		`${isUpdate ? `?user_uuid=${form.watch('user_uuid')}` : `?filteredUser=true`}`
	);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(EMPLOYEE_NULL);
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
	async function onSubmit(values: IEmployee) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			await postData.mutateAsync({
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
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Employee' : 'Add Employee'}
			form={form}
			onSubmit={onSubmit}
			containerClassName='space-y-6'
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='user_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='User'
							options={usersOptions!}
							placeholder='Select User'
							isDisabled={isUpdate}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='employee_id'
					render={(props) => <CoreForm.Input label='Employee ID' {...props} />}
				/>

				<FormField control={form.control} name='gender' render={(props) => <CoreForm.Gender {...props} />} />
				<FormField
					control={form.control}
					name='joining_amount'
					render={(props) => (
						<CoreForm.JoinInputUnit unit='Tk' type='number' label='Joining Amount' {...props} />
					)}
				/>
			</div>

			<Accordion type='single' collapsible>
				<AccordionItem value='advance-options' className='w-full border-b-0'>
					<AccordionTrigger className='!h-fit w-40 rounded-md bg-accent px-3 py-2 text-sm text-white'>
						Advance Options
					</AccordionTrigger>
					<AccordionContent className='pt-4'>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='start_date'
								render={(props) => <CoreForm.DatePicker {...props} />}
							/>
							<FormField
								control={form.control}
								name='workplace_uuid'
								render={(props) => (
									<CoreForm.Select label='Workplace' options={workplaces || []} {...props} />
								)}
							/>
							{/* <FormField
								control={form.control}
								name='designation_uuid'
								render={(props) => (
									<CoreForm.Select label='Designation' options={designations || []} {...props} />
								)}
							/> */}
							<FormField
								control={form.control}
								name='report_position'
								render={(props) => <CoreForm.Input {...props} />}
							/>
							{/* <FormField
								control={form.control}
								name='department_uuid'
								render={(props) => (
									<CoreForm.Select label='Department' options={departments || []} {...props} />
								)}
							/> */}
							<FormField
								control={form.control}
								name='rfid'
								render={(props) => <CoreForm.Input label='RFID' {...props} />}
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
								name='primary_display_text'
								render={(props) => <CoreForm.Input label='Primary Display Text' {...props} />}
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
								name='secondary_display_text'
								render={(props) => <CoreForm.Input label='Secondary Display Text' {...props} />}
							/>

							<FormField
								control={form.control}
								name='employment_type_uuid'
								render={(props) => (
									<CoreForm.Select
										label='Employment Type'
										options={employmentTypes || []}
										{...props}
									/>
								)}
							/>

							<FormField
								control={form.control}
								name='end_date'
								render={(props) => <CoreForm.DatePicker {...props} />}
							/>

							<FormField
								control={form.control}
								name='shift_group_uuid'
								render={(props) => (
									<CoreForm.Select label='Shift Group' options={shiftGroups || []} {...props} />
								)}
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</AddModal>
	);
};

export default AddOrUpdate;
