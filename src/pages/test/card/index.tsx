import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { set } from 'lodash';
import { a } from 'node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o';
import { FormProvider } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import CoreForm from '@core/form';

import { AddCardFormData, ICard } from '../types';

const column = 'sections';
export const Card = ({
	section_uuid,
	remarks,
	uuid,
	index,
	isEditing,
	setEditing,
	defaultCard,
	handleDragStart,
	handleDeleteCard,
	handleSaveCard,
	fieldDefs,
	form,
	updateData,
}: ICard & {
	handleDeleteCard: (uuid: string) => void;
	handleSaveCard: (newCard: ICard) => void;
} & { form: any } & { fieldDefs: any } & { updateData: any; defaultCard: any } & {
	isEditing: any;
	setEditing: any;
}) => {
	const [data, setData] = useState(updateData);

	useEffect(() => {
		setData(updateData);
	}, [updateData]);

	const onSubmit = (data: AddCardFormData) => {
		if (!data.uuid || !data.uuid.trim().length) return;

		handleSave(data);
		form.reset(defaultCard);
		setEditing(-1);
	};
	const handleEdit = () => {
		setEditing(data.index);
		form.reset(data);
	};

	const handleSave = (newCard: any) => {
		handleSaveCard(newCard);
		form.reset(newCard);
		setEditing(-1);
	};

	const handleCancelEdit = () => {
		setData({ section_uuid, remarks, uuid, index });
		form.reset(data);
		setEditing(-1);
	};
	return (
		<>
			<div
				data-before={uuid || '-1'}
				data-column={column}
				className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
			/>
			<m.div
				layout
				layoutId={uuid}
				draggable='true'
				onDragStart={(e: any) =>
					handleDragStart!(e, {
						section_uuid: data.section_uuid,
						uuid,
						index: data.index ?? 0,
						remarks: data.remarks,
					})
				}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing'
			>
				{isEditing === data?.index ? (
					<FormProvider {...form}>
						<m.form layout onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
							{fieldDefs
								.filter((fieldDef: any) => !fieldDef.hidden)
								.map((fieldDef: any) => {
									if (fieldDef.isLoading) {
										return <Skeleton className='h-8 w-full bg-secondary/10' />;
									} else {
										return (
											<>
												{fieldDef.type === 'text' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Input
																type={'text'}
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}

												{fieldDef.type === 'number' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Input
																type='number'
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}
												{fieldDef.type === 'textarea' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Textarea
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}

												{fieldDef.type === 'select' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.ReactSelect
																menuPortalTarget={document.body}
																options={fieldDef.options}
																placeholder={fieldDef.placeholder}
																disableLabel
																{...props}
															/>
														)}
													/>
												)}
											</>
										);
									}
								})}
							<div className='mt-1.5 flex items-center justify-end gap-1.5'>
								<button
									onClick={handleCancelEdit}
									type='button'
									className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
								>
									Close
								</button>
								<button
									type='submit'
									className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
								>
									<span>Save Card</span>
								</button>
							</div>
						</m.form>
					</FormProvider>
				) : (
					<div className='flex items-center justify-between'>
						{fieldDefs
							.filter((fieldDef: any) => !fieldDef.hidden)
							.map((fieldDef: any) => {
								if (fieldDef.type === 'select') {
									const selectedOption = fieldDef.options.find(
										(option: any) =>
											option.value === data[fieldDef.accessorKey as keyof typeof data]
									);
									return (
										<p key={fieldDef.accessorKey} className='flex-1 text-sm'>
											{fieldDef.header}: {selectedOption?.label}
										</p>
									);
								}
								return (
									<p key={fieldDef.accessorKey} className='flex-1 text-sm'>
										{fieldDef.header}:{data[fieldDef.accessorKey as keyof typeof data]}
									</p>
								);
							})}
						<div className='flex gap-2'>
							<FieldActionButton
								handleEdit={() => handleEdit()}
								handleRemove={() => handleDeleteCard(uuid)}
								index={index!}
							/>
						</div>
					</div>
				)}
			</m.div>
		</>
	);
};
