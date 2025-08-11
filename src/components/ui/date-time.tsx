import { format } from 'date-fns';

import { cn } from '@/lib/utils';

const Body = ({ value, className = '' }: { value: string; className?: string }) => {
	return <span className={'text-[0.7rem] font-semibold capitalize text-primary ' + className}>{value}</span>;
};

interface IDateTimeProps {
	date: Date | null | undefined | string;
	isDate?: boolean;
	isTime?: boolean;
	onlyTime?: boolean;
	ClassNameTime?: string;
}

const DateTime: React.FC<IDateTimeProps> = ({
	date,
	isDate = true,
	isTime = true,
	onlyTime = false,
	ClassNameTime,
}) => {
	if (!date) return null;

	const customizedDate = date ? format(new Date(date), 'dd/MM/yy') : '--';
	const customizedTime = date ? format(new Date(date), 'h:mm a') : '--';

	if (onlyTime) return <Body value={customizedTime} />;

	return (
		<div className='flex flex-col'>
			{isDate && <Body value={customizedDate} />}
			{isTime && (
				<Body value={customizedTime} className={cn('-mt-1 text-secondary', !isDate && 'mt-0', ClassNameTime)} />
			)}
		</div>
	);
};
export default DateTime;
