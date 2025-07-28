import { lazy, Suspense, useEffect, useState } from 'react';
import { update } from 'lodash';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import ChatInterface from '@/components/others/message';
import { Message } from '@/components/others/message/utiils';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherProblem } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IDiagnosisTableData, IOrderTableData } from '../_config/columns/columns.type';
import { useWorkChat, useWorkDiagnosisByUUID, useWorkOrder, useWorkOrderByDetails, useWorkRepairing } from '../_config/query';
import { DIAGNOSIS_NULL, DIAGNOSIS_SCHEMA, MESSAGE_NULL, MESSAGE_SCHEMA } from '../_config/schema';
import { IDiagnosisAddOrUpdateProps } from '../_config/types';
import Information from './information';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate: React.FC<IDiagnosisAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useWorkDiagnosisByUUID<IDiagnosisTableData>(updatedData?.uuid as string);
	const { data: orderData, invalidateQuery: invalidateQueryOrderByDetails } = useWorkOrderByDetails<IOrderTableData>(
		updatedData?.order_uuid as string
	);
	const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

	const [deleteMessage, setDeleteMessage] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const {
		data: chatData,
		invalidateQuery: invalidateQueryChat,
		postData,
		deleteData,
		refetch,
	} = useWorkChat<Message[]>(updatedData?.order_uuid as string);
	const { invalidateQuery: invalidateOrder } = useWorkOrder();
	const { invalidateQuery: invalidateRepair } = useWorkRepairing();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>('employee');
	const statusOption = [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Rejected', value: 'rejected' },
		{ label: 'Not Repairable', value: 'not_repairable' },
		{ label: 'Customer Reject', value: 'customer_reject' },
	];

	const form = useRHF(DIAGNOSIS_SCHEMA, DIAGNOSIS_NULL);
	const messageForm = useRHF(MESSAGE_SCHEMA, MESSAGE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(DIAGNOSIS_NULL);
		setOpen((prev) => !prev);
		invalidateOrder();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	const handleSend = async (editId?: string, editText?: string) => {
		try {
			const now = getDateTime();

			if (editId === undefined && messageForm.getValues('message')) {
				// Create new user message
				const userMsg: Message = {
					uuid: nanoid(),
					message: messageForm.getValues('message'),
					page: 'diagnosis',
					order_uuid: updatedData?.order_uuid,
					created_by: user?.uuid,
					created_at: now,
					updated_at: undefined,
				};
				await postData.mutateAsync({
					url: '/work/chat',
					newData: userMsg,
					isOnCloseNeeded: false,
				});
				messageForm.reset(MESSAGE_NULL);
				invalidateQueryChat();
			} else {
				// Update existing message
				const updatedMsg: Message = {
					uuid: editId || '',
					message: editText || '',
					page: 'diagnosis',
					order_uuid: updatedData?.order_uuid,
					created_by: user?.uuid,
					updated_at: now,
				};
				await updateData.mutateAsync({
					url: `/work/chat/${editId}`,
					updatedData: updatedMsg,
					isOnCloseNeeded: false,
				});
				invalidateQueryChat();
				setEditingMessageId(null);
			}
		} catch (error) {
			console.error(`${editId ? 'Update' : 'Create'} failed:`, error);
		}
	};
	const handleDelete = (uuid: string) => {
		const message = chatData?.find((msg) => msg.uuid === uuid);
		setDeleteMessage({
			id: uuid,
			name: message?.message || 'Message',
		});
	};

	// Submit handler
	async function onSubmit(values: IDiagnosisTableData) {
		// UPDATE ITEM
		updateData.mutateAsync({
			url: `${url}/${updatedData?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
				engineer_uuid: user?.uuid,
				status_update_date: data?.status !== values.status ? getDateTime() : data?.status_update_date,
			},
			onClose,
		});

		invalidateRepair();
	}

	return (
		<div>
			<AddModal
				open={open}
				setOpen={onClose}
				title={`Update Diagnosis: ${updatedData?.diagnosis_id} (${updatedData?.order_id}) `}
				isLarge={true}
				form={form}
				onSubmit={onSubmit}
			>
				<Information data={(orderData || []) as IOrderTableData} />
				
				<div className='grid grid-cols-2 gap-4'>
					<div className='flex flex-col gap-4'>
						<FormField
							control={form.control}
							name='problems_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									isMulti
									label='Problem'
									placeholder='Select Problems'
									options={problemOption!}
									{...props}
								/>
							)}
						/>
						<div className='flex gap-4'>
							<FormField
								control={form.control}
								name='problem_statement'
								render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
							/>
							<FormField
								control={form.control}
								name='customer_problem_statement'
								render={(props) => <CoreForm.Textarea label='Customer Problem Statement' {...props} />}
							/>
						</div>
						<div className='flex gap-4'>
							<FormField
								control={form.control}
								name='status'
								render={(props) => (
									<CoreForm.ReactSelect options={statusOption!} label='Status' {...props} />
								)}
							/>
							<FormField
								control={form.control}
								name='proposed_cost'
								render={(props) => <CoreForm.Input type='number' label='Proposed Cost' {...props} />}
							/>
						</div>
						<div className='flex gap-4'>
							<FormField
								control={form.control}
								name='is_proceed_to_repair'
								render={(props) => (
									<CoreForm.Checkbox label='Proceed to Repair' className='h-5' {...props} />
								)}
							/>
							<FormField
								control={form.control}
								name='customer_remarks'
								render={(props) => <CoreForm.Textarea label='Customer Remarks' {...props} />}
							/>
						</div>
						<FormField
							control={form.control}
							name='remarks'
							render={(props) => <CoreForm.Textarea {...props} />}
						/>
					</div>

					<ChatInterface
						handleSend={handleSend}
						form={messageForm}
						data={chatData || []}
						title='Chat With Diagnosis'
						subTitle={`${data?.order_id}`}
						page='repair'
						deleteMessage={handleDelete}
						refetch={refetch}
						editingMessageId={editingMessageId}
						setEditingMessageId={setEditingMessageId}
						onClick={(e) => e.preventDefault()}
					/>
				</div>
			</AddModal>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem: deleteMessage,
						setDeleteItem: setDeleteMessage,
						url: `/work/chat`,
						deleteData,

						invalidateQueries: invalidateQueryChat,
					}}
				/>
			</Suspense>
		</div>
	);
};

export default AddOrUpdate;
