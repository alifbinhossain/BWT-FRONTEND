import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

// import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import '@/lib/common-queries/other'; // useOtherBox,

import { IFormSelectOption } from '@/components/core/form/types';

import { useOtherProblem } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { IDiagnosisTableData, IOrderTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosis, useWorkOrderByUUID } from '../_config/query';
import { ORDER_NULL, ORDER_SCHEMA } from '../_config/schema';
import { IOrderAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IOrderAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;
	const { user } = useAuth();
	const { data } = useWorkOrderByUUID<IOrderTableData>(updatedData?.uuid as string);
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('employee');

	const { invalidateQuery: invalidateDiagnosis } = useWorkDiagnosis<IDiagnosisTableData[]>();

	const form = useRHF(ORDER_SCHEMA, ORDER_NULL);

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ORDER_NULL);
		invalidateDiagnosis();
		setOpen(false);
	};

	// Submit handler
	async function onSubmit(values: IOrderTableData) {
		const payload = {
			...values,
		};

		if (isUpdate) {
			const formData = Formdata({
				...payload,
				updated_at: getDateTime(),
			});
			await imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});
		} else {
			const formData = Formdata({
				...payload,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			});
			await imagePostData.mutateAsync({
				url,
				newData: formData,
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.order_id} Order` : 'Add New Order'}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='delivery_problems_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						isMulti
						label='Problems'
						options={problemOption!}
						placeholder='Select Problems'
						{...props}
					/>
				)}
			/>

			<FormField
				control={form.control}
				name='delivery_problem_statement'
				render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
			/>
			<FormField
				control={form.control}
				name='bill_amount'
				render={(props) => <CoreForm.Input type='number' label='Bill Amount' {...props} />}
			/>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea label='Remarks' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
