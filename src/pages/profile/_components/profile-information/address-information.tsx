import { useState } from 'react';
import { useHrEmployeeAddressByEmployeeUUID } from '@/pages/hr/_config/query';
import { Edit, Plus, Trash2 } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { AddModal, DeleteModal } from '@/components/core/modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { EMPLOYEE_ADDRESS_NULL, EMPLOYEE_ADDRESS_SCHEMA, IEmployeeAddress } from './_config/schema';

const url = `/hr/employee-address`;
type IEmployeeAddressWithUUID = IEmployeeAddress & { uuid: string };

export function AddressInformation({ employee_id }: { employee_id: string }) {
	const [open, setOpen] = useState(false);
	const [currentRecord, setCurrentRecord] = useState<IEmployeeAddressWithUUID | null>(null);

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const { user } = useAuth();
	const { data, postData, updateData, deleteData } =
		useHrEmployeeAddressByEmployeeUUID<IEmployeeAddressWithUUID[]>(employee_id);

	const form = useRHF(EMPLOYEE_ADDRESS_SCHEMA, EMPLOYEE_ADDRESS_NULL);

	const onClose = () => {
		form.reset(EMPLOYEE_ADDRESS_NULL);
		setOpen(false);
	};

	async function onSubmit(values: IEmployeeAddress) {
		if (currentRecord) {
			// Update existing record
			await updateData.mutateAsync({
				url: `${url}/${currentRecord.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				isOnCloseNeeded: false,
			});
		} else {
			// Add new record
			await postData.mutateAsync({
				url,
				newData: {
					...values,
					employee_uuid: employee_id,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}

		setOpen(false);
		form.reset(EMPLOYEE_ADDRESS_NULL);
		setCurrentRecord(null);
	}

	// Handle add new button click
	function handleAddNew() {
		setCurrentRecord(null);
		form.reset(EMPLOYEE_ADDRESS_NULL);
		setOpen(true);
	}

	// Handle edit button click
	function handleEdit(record: IEmployeeAddressWithUUID) {
		setCurrentRecord(record);
		form.reset(record);
		setOpen(true);
	}

	// Handle delete button click
	function handleDelete(record: IEmployeeAddressWithUUID) {
		setDeleteItem({
			id: record.uuid,
			name: record.address_type,
		});
	}

	return (
		<div className='space-y-4 px-4 py-4'>
			{data && data?.length > 0 && (
				<div className='flex items-center justify-end'>
					<Button onClick={handleAddNew} size={'sm'} variant={'accent'}>
						Add New
					</Button>
				</div>
			)}

			<div className='space-y-4'>
				{!data || data?.length === 0 ? (
					<Card className='border border-gray-200'>
						<CardContent className='py-12 text-center'>
							<p className='mb-4 text-gray-500'>No address added yet</p>
							<Button onClick={handleAddNew} variant='accent'>
								<Plus className='size-4' /> Add Your First Address
							</Button>
						</CardContent>
					</Card>
				) : (
					data.map((record, index: number) => (
						<Card key={index} className='border border-gray-200'>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between'>
									<div>
										<h3 className='text-lg font-medium capitalize text-gray-900'>
											{record.address_type}
										</h3>
									</div>
									<div className='flex gap-2'>
										<Button variant='gradient' size='sm' onClick={() => handleEdit(record)}>
											<Edit className='h-4 w-4' />
											Edit
										</Button>
										<Button onClick={() => handleDelete(record)} variant='destructive' size='sm'>
											<Trash2 className='h-4 w-4' />
											Delete
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<table className='w-full border-collapse'>
									<tbody>
										<tr className='border-b'>
											<td className='w-1/3 py-2 font-medium text-gray-700'>Address</td>
											<td className='py-2 text-gray-900'>{record.address}</td>
										</tr>
										<tr className='border-b'>
											<td className='py-2 font-medium text-gray-700'>Thana</td>
											<td className='py-2 text-gray-900'>{record.thana}</td>
										</tr>
										<tr>
											<td className='py-2 font-medium text-gray-700'>District</td>
											<td className='py-2 text-gray-900'>{record.district}</td>
										</tr>
									</tbody>
								</table>
							</CardContent>
						</Card>
					))
				)}
			</div>

			<AddModal
				open={open}
				setOpen={onClose}
				title={currentRecord ? 'Edit Address' : 'Add Address'}
				form={form}
				onSubmit={onSubmit}
			>
				<div className='grid grid-cols-1 gap-4'>
					<FormField
						control={form.control}
						name={`address_type`}
						render={(props) => (
							<CoreForm.ReactSelect
								options={[
									{
										label: 'Permanent',
										value: 'permanent',
									},
									{
										label: 'Present',
										value: 'present',
									},
								]}
								label='Address Type'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={`address`}
						render={(props) => <CoreForm.Input label='Address' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`thana`}
						render={(props) => <CoreForm.Input label='Thana' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`district`}
						render={(props) => <CoreForm.Input label='District' {...props} />}
					/>
				</div>
			</AddModal>

			<DeleteModal
				{...{
					deleteItem,
					setDeleteItem,
					url,
					deleteData,
					onClose: () => {
						onClose?.();
						setDeleteItem(null);
					},
				}}
			/>
		</div>
	);
}
