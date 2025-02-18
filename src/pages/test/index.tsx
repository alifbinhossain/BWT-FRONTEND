import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FaFire } from 'react-icons/fa';
import { FiPlus, FiTrash } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { KanbanProps } from './types';

interface ColumnProps {
	title: string;
	headingColor: string;
	cards: { title: string; id: string; column: string }[];
	column: string;
	setCards: React.Dispatch<React.SetStateAction<{ title: string; id: string; column: string }[]>>;
}
export const CustomKanban: React.FC<KanbanProps> = (props) => {
	const [cards, setCards] = useState(DEFAULT_CARDS);

	return (
		<div className='flex gap-2'>
			<Column
				title='Backlog'
				column='backlog'
				headingColor='text-neutral-500'
				cards={cards}
				setCards={setCards}
			/>
		</div>
	);
};

const Column = ({ title, headingColor, cards, column, setCards }: ColumnProps) => {
	const [active, setActive] = useState(false);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		card: { title: string; id: string; column: string }
	) => {
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

			let cardToTransfer = copy.find((c) => c.id === cardId);
			if (!cardToTransfer) return;
			cardToTransfer = { ...cardToTransfer, column };

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

	const filteredCards = cards.filter((c) => c.column === column);

	return (
		<div className='w-56 flex-auto shrink-0'>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
			>
				{filteredCards.map((c) => {
					return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
				})}
				<DropIndicator beforeId={null} column={column} />
				<AddCard column={column} setCards={setCards} />
			</div>
		</div>
	);
};

const Card = ({
	title,
	id,
	column,
	handleDragStart,
}: {
	title: string;
	id: string;
	column: string;
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: { title: string; id: string; column: string }) => void;
}) => {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={(e: any) => handleDragStart(e, { title, id, column })}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing'
			>
				<p className='flex-1 text-sm'>{title}</p>
			</motion.div>
		</>
	);
};

const DropIndicator = ({ beforeId, column }: { beforeId: string | null; column: string }) => {
	return (
		<div
			data-before={beforeId || '-1'}
			data-column={column}
			className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
		/>
	);
};

const BurnBarrel = ({
	setCards,
}: {
	setCards: React.Dispatch<React.SetStateAction<{ title: string; id: string; column: string }[]>>;
}) => {
	const [active, setActive] = useState(false);

	const handleDragOver = (e: any) => {
		e.preventDefault();
		setActive(true);
	};

	const handleDragLeave = () => {
		setActive(false);
	};

	const handleDragEnd = (e: any) => {
		const cardId = e.dataTransfer.getData('cardId');

		setCards((pv) => pv.filter((c) => c.id !== cardId));

		setActive(false);
	};

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
				active
					? 'border-red-800 bg-red-800/20 text-red-500'
					: 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
			}`}
		>
			{active ? <FaFire className='animate-bounce' /> : <FiTrash />}
		</div>
	);
};

const AddCard = ({
	column,
	setCards,
}: {
	column: string;
	setCards: React.Dispatch<React.SetStateAction<{ title: string; id: string; column: string }[]>>;
}) => {
	const [text, setText] = useState('');
	const [adding, setAdding] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text.trim().length) return;

		const newCard = {
			column,
			title: text.trim(),
			id: Math.random().toString(),
		};

		setCards((pv) => [...pv, newCard]);

		setAdding(false);
	};

	return (
		<>
			{adding ? (
				<motion.form layout onSubmit={handleSubmit}>
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
				</motion.form>
			) : (
				<div className='flex gap-2'>
					<motion.button
						layout
						onClick={() => setAdding(true)}
						className='transition-color flex w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50 h-9'
					>
						<span>Add card</span>
					
					</motion.button>
					<motion.button
						layout
						onClick={() => null}
						className='transition-color flex w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50 h-9 '
					>
						<span>Save</span>
					
					</motion.button>
				</div>
			)}
		</>
	);
};

const DEFAULT_CARDS = [
	// BACKLOG
	{ title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
	{ title: 'SOX compliance checklist', id: '2', column: 'backlog' },
	{ title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
	{ title: 'Document Notifications service', id: '4', column: 'backlog' },
	// TODO
	{
		title: 'Research DB options for new microservice',
		id: '5',
		column: 'todo',
	},
	{ title: 'Postmortem for outage', id: '6', column: 'todo' },
	{ title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },

	// DOING
	{
		title: 'Refactor context providers to use Zustand',
		id: '8',
		column: 'doing',
	},
	{ title: 'Add logging to daily CRON', id: '9', column: 'doing' },
	// DONE
	{
		title: 'Set up DD dashboards for Lambda listener',
		id: '10',
		column: 'done',
	},
];
