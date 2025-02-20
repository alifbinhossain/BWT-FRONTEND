import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';

import { useOtherSection } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useWorkGetTransferSection, useWorkProcesses } from '../work/_config/query';
import { TRANSFER_NULL, TRANSFER_SCHEMA } from './_config/schema';
import { Card } from './card';
import { AddCard } from './card/add-card';
import { ICard, WorkSectionData } from './types';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const column = 'sections';

export const Column = () => {
	const { url: ProcessTransferUrl, updateData, postData, deleteData } = useWorkProcesses();
	const { user } = useAuth();
	const navigate = useNavigate();
	const { diagnosis_uuid, order_uuid } = useParams();
	const { data: sectionOptions } = useOtherSection<IFormSelectOption[]>();

	const { data } = useWorkGetTransferSection<WorkSectionData>(order_uuid!);
	const form = useRHF(TRANSFER_SCHEMA, TRANSFER_NULL);

	const [cards, setCards] = useState<ICard[]>(data?.entry || []);
	const [adding, setAdding] = useState(false);
	const [isEditing, setEditing] = useState(-1);
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);
	useMemo(() => {
		setCards(data?.entry ?? []);
	}, [data]);
	const [active, setActive] = useState(false);

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
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
		setDeleteItem({
			id: uuid,
			name: uuid,
		});
		setCards((prevCards) => prevCards.filter((card) => card.uuid !== uuid));
	};

	const handleSaveCard = (newCard: ICard) => {
		setCards((prevCards) =>
			prevCards?.map((card) => (card.uuid === newCard.uuid ? { ...card, ...newCard } : card))
		);
	};

	const handleSaveAll = async () => {
		const isUpdate = true;
		if (isUpdate) {
			const entry_promise = cards.map((item, index) => {
				if (!data?.entry.some((el: any) => el.uuid === item.uuid)) {
					const newData = {
						...item,
						diagnosis_uuid: diagnosis_uuid !== 'null' ? diagnosis_uuid : null,
						order_uuid: diagnosis_uuid === 'null' ? order_uuid : null,
						index: index + 1,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: ProcessTransferUrl,
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						diagnosis_uuid: diagnosis_uuid !== 'null' ? diagnosis_uuid : null,
						order_uuid: diagnosis_uuid === 'null' ? order_uuid : null,
						index: index + 1,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `${ProcessTransferUrl}/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([...entry_promise]).then(() => {
					// invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/work/order/details/${order_uuid}`);
				});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}
	};
	const fliedDefs = [
		{
			header: 'Section',
			accessorKey: 'section_uuid',
			type: 'select',
			placeholder: 'Select Section',
			options: sectionOptions || [],
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
	];
	const onSubmit = (data: any) => {
		if (!data) return;

		const newCard: any = {
			section_uuid: data.section_uuid.trim(),
			uuid: nanoid(),
			remarks: data.remarks ?? undefined,
			index: 0,
		};
		setCards((pv) => [...pv, newCard]);
		form.reset({ section_uuid: '', remarks: '' });
		setAdding(false);
	};
	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`flex flex-col transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
		>
			{cards?.map((c, index) => {
				const transferData = { section_uuid: c.section_uuid, remarks: c.remarks, uuid: c.uuid, index };
				return (
					<Card
						uuid={c.uuid}
						section_uuid={c.section_uuid}
						isEditing={isEditing}
						setEditing={setEditing}
						key={c.uuid}
						updateData={transferData}
						index={index}
						handleDragStart={handleDragStart}
						handleDeleteCard={handleDeleteCard}
						handleSaveCard={handleSaveCard}
						form={form}
						fieldDefs={fliedDefs}
						defaultCard={TRANSFER_NULL}
					/>
				);
			})}
			<AddCard
				onSubmit={onSubmit}
				fieldDefs={fliedDefs}
				form={form}
				setCards={setCards}
				handleSaveAll={handleSaveAll}
				adding={adding}
				setAdding={setAdding}
				defaultCard={TRANSFER_NULL}
				isEditing={isEditing}
				setEditing={setEditing}
			/>
			{/* <Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/work/process`,
						deleteData,
					}}
				/>
			</Suspense> */}
		</div>
	);
};
