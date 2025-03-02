import cn from '@/lib/cn';

const SwitchToggle = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) => {
	return (
		<input
			type='checkbox'
			className={cn('toggle toggle-md checked:toggle-accent disabled:opacity-30', className)}
			{...props}
		/>
	);
};

export default SwitchToggle;
