export function formatDateForInput(dateInput: Date | string | number | null | undefined): string {
	if (!dateInput) return '';

	const date = new Date(dateInput);

	// Проверка на валидность даты
	if (isNaN(date.getTime())) return '';

	const year = date.getFullYear();
	// Добавляем ведущий ноль для месяцев (01-12)
	const month = String(date.getMonth() + 1).padStart(2, '0');
	// Добавляем ведущий ноль для дней (01-31)
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
