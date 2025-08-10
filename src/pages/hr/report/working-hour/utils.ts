export const decimalHoursToHourMinute = (hours: number) => {
	const h = Math.floor(hours);
	const m = Math.round((hours - h) * 60);
	return `${String(Math.abs(h))}h ${String(m)}m`;
};

export const getWeekDay = (date: Date) => {
	const day = date.getDay();
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return days[day];
};
