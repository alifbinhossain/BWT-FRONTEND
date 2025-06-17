import React from 'react';
import { differenceInSeconds } from 'date-fns';

interface ITimeDifferenceProps {
	earlierDate: Date | string;
	laterDate: Date | string;
}

const TimeDifference: React.FC<ITimeDifferenceProps> = ({ earlierDate, laterDate }) => {
	if (!earlierDate || !laterDate) return null;

	const seconds = differenceInSeconds(new Date(laterDate), new Date(earlierDate));
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	const difference = `${hours}h ${minutes}m`;

	return <p className='text-xs font-medium'>{difference}</p>;
};

export default TimeDifference;
