import { useState } from 'react';
import { useHrEmployeeHistoryByEmployeeUUID } from '@/pages/hr/_config/query';
import { formatDate } from 'date-fns';
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

import { EMPLOYMENT_HISTORY_NULL, EMPLOYMENT_HISTORY_SCHEMA, IEmploymentHistory } from './_config/schema';

const url = `/hr/employee-history`;
type IEmployee = IEmploymentHistory & { uuid: string };

export function EmploymentHistory({ employee_id }: { employee_id: string }) {
	const [open, setOpen] = useState(false);
	const [currentRecord, setCurrentRecord] = useState<IEmployee | null>(null);

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const { user } = useAuth();
	const { data, postData, updateData, deleteData, invalidateQuery } =
		useHrEmployeeHistoryByEmployeeUUID<IEmployee[]>(employee_id);

	const form = useRHF(EMPLOYMENT_HISTORY_SCHEMA, EMPLOYMENT_HISTORY_NULL);

	const onClose = () => {
		form.reset(EMPLOYMENT_HISTORY_NULL);
		setOpen((prev) => !prev);
	};

	async function onSubmit(values: IEmploymentHistory) {
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
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}

		setOpen(false);
		form.reset(EMPLOYMENT_HISTORY_NULL);
		setCurrentRecord(null);
	}

	// Handle add new button click
	function handleAddNew() {
		setCurrentRecord(null);
		form.reset(EMPLOYMENT_HISTORY_NULL);
		setOpen(true);
		invalidateQuery();
	}

	// Handle edit button click
	function handleEdit(record: IEmployee) {
		setCurrentRecord(record);
		form.reset(record);
		setOpen(true);
	}

	// Handle delete button click
	function handleDelete(record: IEmployee) {
		setDeleteItem({
			id: record.uuid,
			name: record.designation,
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

			<div>
				{!data || data?.length === 0 ? (
					<Card className='border border-gray-200'>
						<CardContent className='py-12 text-center'>
							<p className='mb-4 text-gray-500'>No employment history added yet</p>
							<Button onClick={handleAddNew} variant='accent'>
								<Plus className='size-4' /> Add Your First Position
							</Button>
						</CardContent>
					</Card>
				) : (
					data.map((record, index: number) => (
						<Card key={index} className='border border-gray-200'>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between'>
									<div>
										<h3 className='text-lg font-medium text-gray-900'>{record.designation}</h3>
										<p className='text-gray-600'>{record.company_name}</p>
									</div>
									<div className='flex gap-2'>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handleEdit(record)}
											className='gap-1'
										>
											<Edit className='h-4 w-4' />
											Edit
										</Button>
										<Button
											onClick={() => handleDelete(record)}
											variant='outline'
											size='sm'
											className='gap-1 text-red-600 hover:text-red-700'
										>
											<Trash2 className='h-4 w-4' />
											Delete
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
									<div>
										<label className='text-sm font-medium text-gray-700'>Company Business</label>
										<p className='text-gray-900'>{record.company_business}</p>
									</div>
									<div>
										<label className='text-sm font-medium text-gray-700'>Start Date</label>
										<p className='text-gray-900'>{formatDate(record.start_date, 'dd-MMM-yyyy')}</p>
									</div>
									<div>
										<label className='text-sm font-medium text-gray-700'>Location</label>
										<p className='text-gray-900'>{record.location}</p>
									</div>
									<div>
										<label className='text-sm font-medium text-gray-700'>End Date</label>
										<p className='text-gray-900'>
											{record.end_date ? formatDate(record.end_date, 'dd-MMM-yyyy') : 'Present'}
										</p>
									</div>
									<div>
										<label className='text-sm font-medium text-gray-700'>Department</label>
										<p className='text-gray-900'>{record.department}</p>
									</div>
									<div>
										<label className='text-sm font-medium text-gray-700'>Responsibilities</label>
										<p className='text-gray-900'>{record.responsibilities}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>

			<AddModal
				open={open}
				setOpen={onClose}
				title={currentRecord ? 'Edit Employment History' : 'Add Employment History'}
				form={form}
				onSubmit={onSubmit}
			>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name={`company_name`}
						render={(props) => <CoreForm.Input label='Company Name' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`company_business`}
						render={(props) => <CoreForm.Input label='Company Business' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`start_date`}
						render={(props) => <CoreForm.DatePicker label='Start Date' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`end_date`}
						render={(props) => <CoreForm.DatePicker label='End Date' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`department`}
						render={(props) => <CoreForm.Input label='Department' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`designation`}
						render={(props) => <CoreForm.Input label='Designation' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`location`}
						render={(props) => <CoreForm.Input label='Location' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`responsibilities`}
						render={(props) => <CoreForm.Input label='Responsibilities' {...props} />}
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
						invalidateQuery();
					},
				}}
			/>
		</div>
	);
}
