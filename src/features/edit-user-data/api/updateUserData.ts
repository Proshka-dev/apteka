'use server';

import { prisma } from '@/shared/lib/prisma';
import { requireAuth } from '@/shared/lib/auth/dal';
import { userDataSchema } from '../model/userDataSchema';

export async function updateUserData(data: unknown) {
	console.log('updateUserData - data:', data);


	const session = await requireAuth();
	const parsed = userDataSchema.safeParse(data);
	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const { name, phone, email, birthDate, gender } = parsed.data;
	const userId = session.user.id;

	const currentUser = await prisma.user.findUnique({
		where: { id: userId },
		select: { phoneNumber: true, phoneNumberVerified: true, email: true, emailVerified: true },
	});

	if (!currentUser) return { error: { root: ['Пользователь не найден'] } };

	const updateData: any = { name };

	// Телефон: обновляем только если передан и отличается
	if (phone !== undefined && phone !== currentUser.phoneNumber) {
		updateData.phoneNumber = phone;
		updateData.phoneNumberVerified = false;
	}

	// Email: обновляем только если передан, не пустой и отличается
	if (email !== undefined && email !== '' && email !== currentUser.email) {
		updateData.email = email;
		updateData.emailVerified = false;
	} else if (email === '' && currentUser.email) {
		// Пустая строка – не обновляем email, оставляем старый (временный или настоящий)
	}

	// Дата рождения
	updateData.birthDate = birthDate ? new Date(birthDate) : null;

	// Пол
	updateData.gender = gender || null;

	console.log('updateData', updateData);

	await prisma.user.update({
		where: { id: userId },
		data: updateData,
	});

	return { success: true };
}