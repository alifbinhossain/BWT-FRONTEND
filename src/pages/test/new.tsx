import { motion as m } from 'framer-motion';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface ICard {
  title: string;
  id: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
  index: number;
  remove: (index: number) => void;
}

interface IAddCard {
  append: (card: { title: string; id: string }) => void;
}

const DEFAULT_CARDS = [
  { title: 'Look into render bug in dashboard', id: '1' },
  { title: 'SOX compliance checklist', id: '2' },
  { title: '[SPIKE] Migrate to Azure', id: '3' },
  { title: 'Document Notifications service', id: '4' },
];

const column = 'sections';

interface FormValues {
  cards: ICard[];
}

export const Column = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      cards: DEFAULT_CARDS,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'cards',
    keyName: 'rhfId',
  });

  const [active, setActive] = React.useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId');
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const beforeId = element.dataset.before || '-1';

    if (beforeId === cardId) return;

    const fromIndex = fields.findIndex((c) => c.id === cardId);
    if (fromIndex === -1) return;

    let toIndex = beforeId === '-1' ? fields.length : fields.findIndex((c) => c.id === beforeId);
    if (toIndex === -1) return;
    if (toIndex > fromIndex) toIndex -= 1;

    move(fromIndex, toIndex);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: Element[]) => {
    const indicators = els || Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    indicators.forEach((i: any) => (i.style.opacity = '0'));
  };

  const highlightIndicator = (e: any) => {
    clearHighlights();
    const el = getNearestIndicator(e);
    el?.element.style.opacity = '1';
  };

  const getNearestIndicator = (e: any) => {
    const DISTANCE_OFFSET = 50;
    const indicators = getIndicators();
    
    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: indicators[indicators.length - 1] }
    );
  };

  const getIndicators = () => Array.from(document.querySelectorAll(`[data-column="${column}"]`));

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Submitted cards:', data.cards);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
      >
        {fields.map((field, index) => (
          <Card
            key={field.rhfId}
            title={field.title}
            id={field.id}
            index={index}
            handleDragStart={handleDragStart}
            remove={remove}
          />
        ))}
        <AddCard append={append} />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save All Cards
      </button>
    </form>
  );
};

const Card = ({ title, id, handleDragStart, index, remove }: ICard) => {
  return (
    <>
      <div
        data-before={id}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      />
      <m.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e: any) => handleDragStart(e, { title, id })}
        className="cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing"
      >
        <p className="flex-1 text-sm">
          #{id} - {title}
        </p>
        <button
          type="button"
          onClick={() => remove(index)}
          className="mt-2 text-xs text-red-500 hover:text-red-400"
        >
          Delete
        </button>
      </m.div>
    </>
  );
};

const AddCard = ({ append }: IAddCard) => {
  const [adding, setAdding] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<{ title: string }>();

  const onSubmit = (data: { title: string }) => {
    append({ title: data.title.trim(), id: Math.random().toString() });
    reset();
    setAdding(false);
  };

  return adding ? (
    <m.form layout onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register('title', { required: 'Title is required' })}
        autoFocus
        placeholder="Add new task..."
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
      />
      <div className="mt-1.5 flex items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={() => {
            reset();
            setAdding(false);
          }}
          className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          Close
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
        >
          Save
        </button>
      </div>
    </m.form>
  ) : (
    <div className="flex gap-2">
      <m.button
        layout
        onClick={() => setAdding(true)}
        className="transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50"
      >
        Add card
      </m.button>
    </div>
  );
};