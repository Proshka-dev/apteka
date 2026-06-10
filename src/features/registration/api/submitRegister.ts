'use server';

import { normalizePhone, prisma } from '@/shared/lib';
import { RegisterFormData, registerSchema } from '../model/registerSchema';
// import { sendAdminNotification } from '@/shared/lib/notifications'; 

export async function submitRegister(data: RegisterFormData) {
	const parsed = registerSchema.safeParse(data);

	// 1. Валидация входных данных (ошибки пользователя)
	if (!parsed.success) {
		return { error: parsed.error.flatten((issue) => issue.message).fieldErrors };
	}

	const phone = normalizePhone(parsed.data.phone);

	try {
		// Сохраняем заявку в БД
		// await prisma.callbackRequest.create({
		// 	data: { phone, otp },
		// });
		console.log('Сохранение в базу:', { name, phone });

		return { success: true };

	} catch (error) {
		// 2. Обработка системных ошибок (ошибки сервера)
		// Логируем реальную ошибку на сервере для дебага
		console.error('Registration error:', error);

		// Возвращаем безопасный текст для пользователя, чтобы не раскрывать детали инфраструктуры
		return {
			serverError: 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.',
		};
	}
}