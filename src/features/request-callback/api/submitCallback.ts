'use server';

import { prisma } from '@/shared/lib';
import { callbackSchema } from '../model/callbackSchema';
// import { sendAdminNotification } from '@/shared/lib/notifications'; 

export async function submitCallback(formData: FormData) {
	const raw = Object.fromEntries(formData);
	const parsed = callbackSchema.safeParse(raw);

	// 1. Валидация входных данных (ошибки пользователя)
	if (!parsed.success) {
		return { error: parsed.error.flatten((issue) => issue.message).fieldErrors };
	}

	const { name, phone } = parsed.data;

	try {
		// Сохраняем заявку в БД
		await prisma.callbackRequest.create({
			data: { name, phone },
		});
		console.log('Сохранение в базу:', { name, phone });

		// Отправляем уведомление менеджеру
		// await sendAdminNotification(`Новая заявка на звонок: ${name}, ${phone}`);

		// Или интеграция с телефонией через HTTP-хук
		// await fetch('https://callback.provider', { method: 'POST', body: JSON.stringify({ phone }) });

		return { success: true };

	} catch (error) {
		// 2. Обработка системных ошибок (ошибки сервера)
		// Логируем реальную ошибку на сервере для дебага
		console.error('Callback submission error:', error);

		// Возвращаем безопасный текст для пользователя, чтобы не раскрывать детали инфраструктуры
		return {
			serverError: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
		};
	}
}