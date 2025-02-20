import { motion as m } from 'framer-motion';
import { FormProvider } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import CoreForm from '@core/form';

export const AddCard = ({
	handleSaveAll,
	form,
	fieldDefs,
	defaultCard,
	onSubmit,
	adding,
	setAdding,
	isEditing,
	setEditing,
}: any & { handleSaveAll: () => void } & { form: any } & { fieldDefs: any } & {
	newCard: any;
	defaultCard: any;
} & { onSubmit: any }) => {
	const handleAddingClick = () => {
		setAdding(true);
		setEditing(-1);
	};

	const handleCloseForm = () => {
		setAdding(false);
		form.reset(defaultCard);
	};
	console.log(isEditing);

	return adding && isEditing === -1 ? (
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
						onClick={handleCloseForm}
						type='button' 
						className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
					>
						Close
					</button>
					<button
						type='submit'
						className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
					>
						<span>Save Section</span>
					</button>
				</div>
			</m.form>
		</FormProvider>
	) : (
		<div className='flex gap-2'>
			<m.button
				layout
				onClick={handleAddingClick}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Add Section</span>
			</m.button>
			<m.button
				layout
				onClick={handleSaveAll}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Save</span>
			</m.button>
		</div>
	);
};
