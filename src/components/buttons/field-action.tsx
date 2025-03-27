import { Copy, Edit, Plus, Trash2 } from 'lucide-react';

import { Button } from '../ui/button';

interface FieldActionButtonProps {
	handleCopy?: (index: number | string) => void;
	handleRemove?: (index: number | string) => void;
	handleEdit?: (index: number | string) => void;
	handleAdd?: (index: number | string) => void;
	index: number | string;
}

const FieldActionButton = ({ handleAdd, handleCopy, handleEdit, handleRemove, index }: FieldActionButtonProps) => {
	return (
		<div className='flex items-center'>
			{handleAdd && (
				<Button
					className='rounded-full'
					onClick={() => handleAdd(index)}
					type='button'
					size={'icon'}
					variant={'ghost'}
				>
					<Plus className='size-4' />
				</Button>
			)}
			{handleEdit && (
				<Button
					className='rounded-full'
					onClick={() => handleEdit(index)}
					type='button'
					size={'icon'}
					variant={'ghost'}
				>
					<Edit className='size-4' />
				</Button>
			)}
			{handleCopy && (
				<Button
					className='rounded-full'
					onClick={() => handleCopy(index)}
					type='button'
					size={'icon'}
					variant={'ghost'}
				>
					<Copy className='size-4' />
				</Button>
			)}
			{handleRemove && (
				<Button
					className='rounded-full'
					onClick={() => handleRemove(index)}
					type='button'
					size={'icon'}
					variant={'ghost-destructive'}
				>
					<Trash2 className='size-4' />
				</Button>
			)}
		</div>
	);
};

export default FieldActionButton;
