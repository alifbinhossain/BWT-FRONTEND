import { Send } from 'lucide-react';

export const WhatsApp = ({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) => {
	return (
		<button
			disabled={disabled}
			type='button'
			className='rounded-lg text-white p-2 bg-green-500'
			onClick={onClick}
		>
			<Send className='w-4' />
		</button>
	);
};
