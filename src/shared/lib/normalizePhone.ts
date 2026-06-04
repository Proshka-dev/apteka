export function normalizePhone(phone: string): string {
	// Удаляем всё, кроме цифр и ведущего плюса
	const cleaned = phone.replace(/[^\d+]/g, '');
	// Если начинается с 8, заменяем на +7 (для российских номеров)
	if (cleaned.startsWith('8')) {
		return '+7' + cleaned.slice(1);
	}
	// Если начинается с 7 без плюса, добавляем
	if (cleaned.startsWith('7')) {
		return '+' + cleaned;
	}
	return cleaned;
}