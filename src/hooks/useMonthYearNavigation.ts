import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';

export const useMonthYearNavigation = (
	isYearly: boolean = false,
	initialMonth: number = getMonth(new Date()),
	initialYear: number = getYear(new Date())
) => {
	const [month, setMonth] = useState(initialMonth);
	const [year, setYear] = useState(initialYear);
	if (isYearly) {
		const handlePrev = () => {
			setYear((prev) => prev - 1);
		};

		const handleNext = () => {
			setYear((prev) => prev + 1);
		};

		return {
			year,
			handlePrev,
			handleNext,
		};
	}

	const handlePrev = () => {
		if (month === 0) {
			setMonth(11);
			setYear((prev) => prev - 1);
		} else {
			setMonth((prev) => prev - 1);
		}
	};

	const handleNext = () => {
		if (month === 11) {
			setMonth(0);
			setYear((prev) => prev + 1);
		} else {
			setMonth((prev) => prev + 1);
		}
	};

	return {
		month,
		year,
		handlePrev,
		handleNext,
	};
};
