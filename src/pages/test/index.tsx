import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { useForm, UseFormReturn } from 'react-hook-form';

import { useOtherSection } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useWorkGetTransferSection } from '../work/_config/query';
import { IAddCard, ICard } from './types';
import { DEFAULT_CARDS } from './utils';

const column = 'sections';

// Define a type for the form data
interface AddCardFormData {
	section_uuid: string;
	remarks: string;
}

// Create a custom hook for the AddCard form
const useAddCardForm = (
	setCards: React.Dispatch<React.SetStateAction<ICard[]>>,
	setAdding: React.Dispatch<React.SetStateAction<boolean>>
): UseFormReturn<AddCardFormData> & { onSubmit: (data: AddCardFormData) => void } => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
	} = useForm<AddCardFormData>();

	const onSubmit = (data: AddCardFormData) => {
		if (!data.section_uuid.trim().length) return;

		const newCard: ICard = {
			section_uuid: data.section_uuid.trim(),
			uuid: nanoid(),
			remarks: data.remarks,
			index: 0, // Default value; will be updated in list rendering if needed
			id: nanoid(), // Unique identifier for the card
			handleDragStart: () => {}, // Placeholder function for dragStart event
		};

		setCards((pv) => [...pv, newCard]);
		reset({ section_uuid: '', remarks: '' }); // Clear text after submit
		setAdding(false); // Close the form after submit if needed
	};

	return {
		register,
		handleSubmit,
		reset,
		formState,
		onSubmit,
	};
};

export const Column = () => {
	const [cards, setCards] = useState(DEFAULT_CARDS);
	const [active, setActive] = useState(false);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		card: { section_uuid: string; uuid: string; remarks: string }
	) => {
		e.dataTransfer.setData('cardId', card.uuid);
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData('cardId');
		console.log('cardId:', cardId);

		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);

		const before = element.dataset.before || '-1';

		if (before !== cardId) {
			let copy = [...cards];

			const cardToTransfer = copy.find((c) => c.uuid === cardId);
			if (!cardToTransfer) return;

			copy = copy.filter((c) => c.uuid !== cardId);

			const moveToBack = before === '-1';

			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex((el) => el.uuid === before);
				if (insertAtIndex === undefined) return;

				copy.splice(insertAtIndex, 0, cardToTransfer);
			}

			setCards(copy);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		highlightIndicator(e);

		setActive(true);
	};

	const clearHighlights = (els?: any) => {
		const indicators = els || getIndicators();

		indicators.forEach((i: any) => {
			i.style.opacity = '0';
		});
	};

	const highlightIndicator = (e: any) => {
		const indicators = getIndicators();

		clearHighlights(indicators);

		const el = getNearestIndicator(e, indicators);

		el.element.style.opacity = '1';
	};

	const getNearestIndicator = (e: any, indicators: any) => {
		const DISTANCE_OFFSET = 50;

		const el = indicators.reduce(
			(closest: any, child: any) => {
				const box = child.getBoundingClientRect();

				const offset = e.clientY - (box.top + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			}
		);

		return el;
	};

	const getIndicators = () => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
	};

	const handleDragLeave = () => {
		clearHighlights();
		setActive(false);
	};

	const handleDeleteCard = (uuid: string) => {
		setCards((prevCards) => prevCards.filter((card) => card.uuid !== uuid));
	};

	const handleSaveCard = (uuid: string, newSectionUuid: string, newRemarks: string) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.uuid === uuid ? { ...card, section_uuid: newSectionUuid, remarks: newRemarks } : card
			)
		);
	};

	const handleSaveAll = async () => {
		console.log('Saving all cards:', cards);
	};

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`flex flex-col transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
		>
			{cards.map((c, index) => {
				return (
					<Card
						key={c.uuid}
						{...c}
						index={index}
						handleDragStart={handleDragStart}
						handleDeleteCard={handleDeleteCard}
						handleSaveCard={handleSaveCard}
					/>
				);
			})}
			<AddCard setCards={setCards} handleSaveAll={handleSaveAll} />
		</div>
	);
};

const Card = ({
	section_uuid,
	remarks,
	uuid,
	index,
	handleDragStart,
	handleDeleteCard,
	handleSaveCard,
}: ICard & {
	handleDeleteCard: (uuid: string) => void;
	handleSaveCard: (uuid: string, newSectionUuid: string, newRemarks: string) => void;
}) => {
	const [isEditing, setEditing] = useState(false);
	const [cardSection, setCardSection] = useState(section_uuid);
	const [cardRemarks, setRemarks] = useState(remarks);

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSave = () => {
		handleSaveCard(uuid, cardSection, cardRemarks);
		setEditing(false);
	};

	const handleCancelEdit = () => {
		setCardSection(section_uuid); // Revert to original title
		setRemarks(remarks); // Revert to original remarks
		setEditing(false);
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
					handleDragStart(e, { section_uuid: cardSection, uuid, index, remarks: cardRemarks })
				}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing'
			>
				{isEditing ? (
					<div>
						<textarea
							value={cardSection}
							onChange={(e) => setCardSection(e.target.value)}
							className='w-full rounded border border-violet-400 bg-violet-400/20 p-1 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
						/>
						<textarea
							value={cardRemarks}
							onChange={(e) => setRemarks(e.target.value)}
							placeholder='Add remarks...'
							className='mt-2 w-full rounded border border-violet-400 bg-violet-400/20 p-1 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
						/>
						<div className='mt-1.5 flex items-center justify-end gap-1.5'>
							<button
								onClick={handleCancelEdit}
								className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
							>
								<span>Save</span>
							</button>
						</div>
					</div>
				) : (
					<div className='flex items-center justify-between'>
						<p className='flex-1 text-sm'>
							#{index + 1} - {cardSection} - {remarks}
						</p>
						<div className='flex gap-2'>
							<button
								onClick={handleEdit}
								className='px-2 py-1 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteCard(uuid)}
								className='px-2 py-1 text-xs text-red-400 transition-colors hover:text-red-50'
							>
								Delete
							</button>
						</div>
					</div>
				)}
			</m.div>
		</>
	);
};

const AddCard = ({ setCards, handleSaveAll }: IAddCard & { handleSaveAll: () => void }) => {
	const { data } = useOtherSection();
	const [adding, setAdding] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		onSubmit,
	} = useAddCardForm(setCards, setAdding);

	const handleAddingClick = () => {
		setAdding(true);
	};

	const handleCloseForm = () => {
		setAdding(false);
		reset({ section_uuid: '' }); // Clear text when closing form
	};

	return adding ? (
		<m.form layout onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
			<select
				{...register('section_uuid', { required: 'Section is required' })}
				autoFocus
				className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
			>
				<option value='' disabled hidden>Select a section</option>
				{Array.isArray(data) ? data.map((section: { value: string; label: string }) => (
					<option key={section.value} value={section.value}>
						{section.label}
					</option>
				)) : null}
			</select>
			{errors.section_uuid && <p className='text-xs text-red-500'>{errors.section_uuid.message}</p>}
			<textarea
				{...register('remarks', { required: 'Task title is required' })}
				autoFocus
				placeholder='Add new task...'
				className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
			/>
			{errors.remarks && <p className='text-xs text-red-500'>{errors.remarks.message}</p>}
			<div className='mt-1.5 flex items-center justify-end gap-1.5'>
				<button
					onClick={handleCloseForm}
					type='button' // Prevent form submission when closing
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
	) : (
		<div className='flex gap-2'>
			<m.button
				layout
				onClick={handleAddingClick}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Add card</span>
			</m.button>
			<m.button
				layout
				onClick={handleSaveAll}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Save Column</span>
			</m.button>
		</div>
	);
};
