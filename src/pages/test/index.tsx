import React, { useState } from 'react';
import { motion as m } from 'framer-motion';

import { ICard,IAddCard } from './types';
import { DEFAULT_CARDS } from './utils';

const column = 'sections';

export const Column = () => {
	const [cards, setCards] = useState(DEFAULT_CARDS);
	const [active, setActive] = useState(false);

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: { title: string; id: string }) => {
		e.dataTransfer.setData('cardId', card.id);
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData('cardId');

		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);

		const before = element.dataset.before || '-1';

		if (before !== cardId) {
			let copy = [...cards];

			const cardToTransfer = copy.find((c) => c.id === cardId);
			if (!cardToTransfer) return;

			copy = copy.filter((c) => c.id !== cardId);

			const moveToBack = before === '-1';

			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex((el) => el.id === before);
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

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`flex flex-col transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
		>
			{cards.map((c) => {
				return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
			})}
			<AddCard setCards={setCards} />
		</div>
	);
};

const Card = ({ title, id, handleDragStart }: ICard) => {
	return (
		<>
			<div
				data-before={id || '-1'}
				data-column={column}
				className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
			/>
			<m.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={(e: any) => handleDragStart(e, { title, id })}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing'
			>
				<p className='flex-1 text-sm'>
					#{id} - {title}
				</p>
			</m.div>
		</>
	);
};

const AddCard = ({ setCards }: IAddCard) => {
	const [text, setText] = useState('');
	const [adding, setAdding] = useState(false);

	// React Hook Form -> append
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text.trim().length) return;

		const newCard = {
			title: text.trim(),
			id: Math.random().toString(),
		};

		setCards((pv) => [...pv, newCard]);

		setAdding(false);
	};

	return adding ? (
		<m.form layout onSubmit={handleSubmit}>
			<textarea
				onChange={(e) => setText(e.target.value)}
				autoFocus
				placeholder='Add new task...'
				className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
			/>
			<div className='mt-1.5 flex items-center justify-end gap-1.5'>
				<button
					onClick={() => setAdding(false)}
					className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
				>
					Close
				</button>
				<button
					type='submit'
					className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
				>
					<span>Save</span>
				</button>
			</div>
		</m.form>
	) : (
		<div className='flex gap-2'>
			<m.button
				layout
				onClick={() => setAdding(true)}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Add card</span>
			</m.button>
			<m.button
				layout
				onClick={() => null}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Save</span>
			</m.button>
		</div>
	);
};
