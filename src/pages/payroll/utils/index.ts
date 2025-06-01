export const type = [
	{
		label: 'Full',
		value: 'full',
	},
	{
		label: 'Partial',
		value: 'partial',
	},
];

export const months = [
	{
		label: 'January',
		value: '01',
	},
	{
		label: 'February',
		value: '02',
	},
	{
		label: 'March',
		value: '03',
	},
	{
		label: 'April',
		value: '04',
	},
	{
		label: 'May',
		value: '05',
	},
	{
		label: 'June',
		value: '06',
	},
	{
		label: 'July',
		value: '07',
	},
	{
		label: 'August',
		value: '08',
	},
	{
		label: 'September',
		value: '09',
	},
	{
		label: 'October',
		value: '10',
	},
	{
		label: 'November',
		value: '11',
	},
	{
		label: 'December',
		value: '12',
	},
];

export const years = (startYear: number) => {
	const CURRENT_YEAR = new Date().getFullYear();

	const year = Array.from({ length: CURRENT_YEAR - startYear + 1 }, (_, i) => {
		const year = (startYear + i).toString();
		return { label: year, value: year };
	});

	return year;
};
