//* Format Decimal Values To Hours
export function formatDecimalHours(decimalHours: number) {
	if (!decimalHours) return '--';
	const totalMinutes = Math.round(decimalHours * 60);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${hours}h ${minutes}m`;
}
