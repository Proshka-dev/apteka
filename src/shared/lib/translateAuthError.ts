// features/auth/lib/translateAuthError.ts

const authErrorMap: Record<string, string> = {
	'Invalid OTP': 'Неверный код',
	'OTP expired': 'Срок действия кода истёк',
	'OTP not found': 'Код не найден',
	'Too many attempts': 'Слишком много попыток',
	'Phone number not found': 'Номер не найден',
	'Invalid phone number': 'Некорректный номер телефона',
	'Invalid email': 'Некорректный email',
};

const defaultError = 'Произошла ошибка. Попробуйте позже';

export function translateAuthError(message?: string): string {
	if (!message) return defaultError;
	// Прямое совпадение
	if (authErrorMap[message]) return authErrorMap[message];
	// Частичное совпадение (на случай, если сообщение содержит дополнительный текст)
	for (const [eng, rus] of Object.entries(authErrorMap)) {
		if (message.includes(eng)) return rus;
	}
	// Если ошибка неизвестна, возвращаем исходное сообщение (можно и заменить на дефолтное)
	return message || defaultError;
}