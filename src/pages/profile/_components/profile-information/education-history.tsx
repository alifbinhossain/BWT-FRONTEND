import { useState } from 'react';
import { useHrEmployeeEducationByEmployeeUUID } from '@/pages/hr/_config/query';
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

import { EMPLOYEE_EDUCATION_NULL, EMPLOYEE_EDUCATION_SCHEMA, IEmployeeEducation } from './_config/schema';

const url = `/hr/employee-education`;
type IEmployeeEducationDetails = IEmployeeEducation & { uuid: string };

export function EducationHistory({ employee_id }: { employee_id: string }) {
	const [open, setOpen] = useState(false);
	const [currentRecord, setCurrentRecord] = useState<IEmployeeEducationDetails | null>(null);

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const { user } = useAuth();
	const { data, postData, updateData, deleteData, invalidateQuery } =
		useHrEmployeeEducationByEmployeeUUID<IEmployeeEducationDetails[]>(employee_id);

	const form = useRHF(EMPLOYEE_EDUCATION_SCHEMA, EMPLOYEE_EDUCATION_NULL);

	const onClose = () => {
		form.reset(EMPLOYEE_EDUCATION_NULL);
		setOpen((prev) => !prev);
	};

	async function onSubmit(values: IEmployeeEducation) {
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
		form.reset(EMPLOYEE_EDUCATION_NULL);
		setCurrentRecord(null);
	}

	// Handle add new button click
	function handleAddNew() {
		setCurrentRecord(null);
		form.reset(EMPLOYEE_EDUCATION_NULL);
		setOpen(true);
		invalidateQuery();
	}

	// Handle edit button click
	function handleEdit(record: IEmployeeEducationDetails) {
		setCurrentRecord(record);
		form.reset(record);
		setOpen(true);
	}

	// Handle delete button click
	function handleDelete(record: IEmployeeEducationDetails) {
		setDeleteItem({
			id: record.uuid,
			name: record.degree_name,
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
							<p className='mb-4 text-gray-500'>No education history added yet</p>
							<Button onClick={handleAddNew} variant='accent'>
								<Plus className='size-4' /> Add Your First Education
							</Button>
						</CardContent>
					</Card>
				) : (
					data.map((record, index: number) => (
						<Card key={index} className='border border-gray-200'>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between'>
									<div>
										<h3 className='text-lg font-medium text-gray-900'>
											{index + 1}. {record.degree_name}
										</h3>
									</div>
									<div className='flex gap-2'>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handleEdit(record)}
											className='gap-1 bg-teal-500 text-white hover:bg-teal-600'
										>
											<Edit className='h-4 w-4' />
											Edit
										</Button>
										<Button
											onClick={() => handleDelete(record)}
											variant='outline'
											size='sm'
											className='gap-1 bg-red-600 text-white hover:bg-red-700'
										>
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
											<td className='w-1/3 py-2 font-medium text-gray-700'>Institution</td>
											<td className='py-2 text-gray-900'>{record.institute}</td>
										</tr>
										<tr className='border-b'>
											<td className='py-2 font-medium text-gray-700'>Board</td>
											<td className='py-2 text-gray-900'>{record.board}</td>
										</tr>
										<tr className='border-b'>
											<td className='py-2 font-medium text-gray-700'>Year</td>
											<td className='py-2 text-gray-900'>{record.year_of_passing}</td>
										</tr>
										<tr>
											<td className='py-2 font-medium text-gray-700'>Grade</td>
											<td className='py-2 text-gray-900'>{record.grade}</td>
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
				title={currentRecord ? 'Edit Education' : 'Add Education'}
				form={form}
				onSubmit={onSubmit}
			>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name={`degree_name`}
						render={(props) => <CoreForm.Input label='Degree' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`institute`}
						render={(props) => <CoreForm.Input label='Institution' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`board`}
						render={(props) => <CoreForm.Input label='Board' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`year_of_passing`}
						render={(props) => <CoreForm.Input label='Year' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`grade`}
						render={(props) => <CoreForm.Input label='Grade' {...props} />}
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
