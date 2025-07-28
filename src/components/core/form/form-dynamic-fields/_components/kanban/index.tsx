import React from 'react';

import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import CoreForm from '@core/form';

import { cn } from '@/lib/utils';

import { DynamicFieldsProps } from '../../types';

const KanbanDynamicFields: React.FC<Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>> = ({
	fields,
	fieldName,
	fieldDefs,
	form,
	className,
}) => {
	return (
		<div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3', className)}>
			{fields.length === 0 && <p className='text-destructive'>No fields added yet</p>}
			{fields.length > 0 &&
				fields.map((field, fieldIndex) => (
					<div className='relative flex flex-col items-start space-y-4 overflow-hidden rounded-md border bg-white px-2.5 pb-3 pt-10 shadow-sm lg:px-4 lg:pt-12'>
						{fieldDefs
							.filter((fieldDef) => !fieldDef.hidden)
							.map((fieldDef) => {
								if (fieldDef.isLoading) {
									return <Skeleton className='h-8 w-full bg-secondary/10' />;
								} else {
									return (
										<div className={cn('w-full', fieldDef.className)} key={fieldDef.accessorKey}>
											{fieldDef.type === 'readOnly' &&
												field[fieldDef.accessorKey as keyof typeof field]}

											{fieldDef.type === 'custom' &&
												fieldDef.accessorKey !== 'actions' &&
												fieldDef.component(fieldIndex)}

											{fieldDef.type === 'custom' && fieldDef.accessorKey === 'actions' && (
												<div className='bg-gradient rounded-y absolute left-0 right-0 top-0 flex items-center justify-between border-b px-4 py-1.5'>
													<div className='flex gap-4 items-center'>
														<span className='text-sm font-medium'>
															Entry # {fieldIndex + 1}
														</span>
														<span className='font-medium'>
															{
																<DateTime
																	date={form.watch(
																		`order_entry.${fieldIndex}.created_at`
																	)}
																	isTime={false}
																/>
															}
														</span>
													</div>
													{fieldDef.component(fieldIndex)}
												</div>
											)}

											{fieldDef.type === 'join-input-unit' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.JoinInputUnit
															unit={fieldDef.unit(fieldIndex)}
															label={fieldDef.header}
															type={fieldDef.inputType}
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'text' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.Input
															type={'text'}
															placeholder={fieldDef.placeholder}
															label={fieldDef.header}
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'number' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.Input
															type='number'
															placeholder={fieldDef.placeholder}
															label={fieldDef.header}
															{...props}
														/>
													)}
												/>
											)}
											{fieldDef.type === 'textarea' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.Textarea
															label={fieldDef.header}
															placeholder={fieldDef.placeholder}
															name={fieldDef.accessorKey}
															{...props}
															id={'message'}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'select' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.ReactSelect
															menuPortalTarget={document.body}
															options={fieldDef.options}
															placeholder={fieldDef.placeholder}
															label={fieldDef.header}
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'select-create' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.ReactSelectCreate
															menuPortalTarget={document.body}
															options={fieldDef.options}
															placeholder={fieldDef.placeholder}
															label={fieldDef.header}
															{...props}
														/>
													)}
												/>
											)}
											{fieldDef.type === 'multiSelect' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.MultiSelect
															options={fieldDef.options}
															placeholder={fieldDef.placeholder}
															label={fieldDef.header}
															{...props}
														/>
													)}
												/>
											)}
											{fieldDef.type === 'checkBox' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<div className='flex w-full items-center'>
															<CoreForm.Checkbox label={fieldDef.header} {...props} />
														</div>
													)}
												/>
											)}
										</div>
									);
								}
							})}
					</div>
				))}
		</div>
	);
};

export default KanbanDynamicFields;
