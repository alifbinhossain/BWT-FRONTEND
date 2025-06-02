import { useState } from 'react';
import { useHrEmployeeDocumentsByEmployeeUUID } from '@/pages/hr/_config/query';
import { Plus } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { AddModal, DeleteModal } from '@/components/core/modal';
import FilePreview from '@/components/others/file-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { EMPLOYEE_DOCUMENT_NULL, EMPLOYEE_DOCUMENT_SCHEMA, IEmployeeDocument } from './_config/schema';

const url = `/hr/employee-document`;
type IEmployeeDocumentWithUUID = IEmployeeDocument & { uuid: string };

export function EmployeeDocuments({ employee_id }: { employee_id: string }) {
	const [open, setOpen] = useState(false);
	const [currentRecord, setCurrentRecord] = useState<IEmployeeDocumentWithUUID | null>(null);

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const { user } = useAuth();
	const { data, deleteData, invalidateQuery, imagePostData, imageUpdateData } =
		useHrEmployeeDocumentsByEmployeeUUID<IEmployeeDocumentWithUUID[]>(employee_id);

	const form = useRHF(EMPLOYEE_DOCUMENT_SCHEMA, EMPLOYEE_DOCUMENT_NULL);

	const onClose = () => {
		form.reset(EMPLOYEE_DOCUMENT_NULL);
		setOpen(false);
	};

	async function onSubmit(values: IEmployeeDocument) {
		const formData = Formdata<IEmployeeDocument>(values);

		if (currentRecord) {
			// Update existing record
			formData.append('updated_at', getDateTime());
			await imageUpdateData.mutateAsync({
				url: `${url}/${currentRecord.uuid}`,
				updatedData: formData,
				isOnCloseNeeded: false,
			});
		} else {
			// Add new record
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());
			formData.append('employee_uuid', employee_id);
			await imagePostData.mutateAsync({
				url,
				newData: formData,
				onClose,
			});
		}

		setOpen(false);
		form.reset(EMPLOYEE_DOCUMENT_NULL);
		setCurrentRecord(null);
	}

	// Handle add new button click
	function handleAddNew() {
		setCurrentRecord(null);
		form.reset(EMPLOYEE_DOCUMENT_NULL);
		setOpen(true);
		invalidateQuery();
	}

	// Handle delete button click
	function handleDelete(record: IEmployeeDocumentWithUUID) {
		setDeleteItem({
			id: record.uuid,
			name: record.description,
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
							<p className='mb-4 text-gray-500'>No documents uploaded yet</p>
							<Button onClick={handleAddNew} variant='accent'>
								<Plus className='size-4' /> Upload Your First Document
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className='overflow-hidden rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow className='h-9'>
									<TableHead className='font-medium'>Type</TableHead>
									<TableHead className='font-medium'>Description</TableHead>
									<TableHead className='font-medium'>Link</TableHead>
									<TableHead className='font-medium'>Remove</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((record, index) => (
									<TableRow key={index} className='hover:bg-gray-50'>
										<TableCell className='font-medium'>{record.document_type}</TableCell>
										<TableCell>{record.description}</TableCell>
										<TableCell>
											<FilePreview
												preview={record.file as string}
												buttonProps={{
													size: 'sm',
													variant: 'link',
													className: '!h-auto !p-0 !text-accent',
												}}
											>
												Download
											</FilePreview>
										</TableCell>
										<TableCell>
											<Button
												onClick={() => handleDelete(record)}
												size='xs'
												variant={'destructive'}
											>
												Remove
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			<AddModal
				open={open}
				setOpen={onClose}
				title={currentRecord ? 'Edit Document' : 'Add Document'}
				form={form}
				onSubmit={onSubmit}
			>
				<div className='grid grid-cols-1 gap-4'>
					<FormField
						control={form.control}
						name={`document_type`}
						render={(props) => (
							<CoreForm.ReactSelect
								options={[
									{ label: 'SSC', value: 'ssc' },
									{ label: 'HSC', value: 'hsc' },
									{ label: 'Bachelor', value: 'bachelor' },
									{ label: 'Master', value: 'master' },
									{
										label: 'Passport',
										value: 'passport',
									},
									{
										label: 'NID',
										value: 'national_id',
									},
									{
										label: 'Driving License',
										value: 'driving_license',
									},
									{
										label: 'Other',
										value: 'other',
									},
								]}
								label='Document Type'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name={`description`}
						render={(props) => <CoreForm.Textarea label='Description' {...props} />}
					/>
					<FormField
						control={form.control}
						name={`file`}
						render={(props) => <CoreForm.FileUpload fileType='all' label='Choose File' {...props} />}
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
