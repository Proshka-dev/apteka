// features/edit-personal-data/api/updateUserData.ts
'use server';

import { prisma } from '@/shared/lib/prisma';
import { requireAuth } from '@/shared/lib/auth/dal';
import { userDataSchema } from '../model/userDataSchema';

export async function updateUserData(data: unknown) {
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

	// Телефон обновляем только если передан и действительно отличается
	if (phone && phone !== currentUser.phoneNumber) {
		updateData.phoneNumber = phone;
		updateData.phoneNumberVerified = false; // но обычно плагин сам обновляет
	}

	// Email: если передан и отличается – обновляем с verified = false
	if (email && email !== currentUser.email) {
		updateData.email = email;
		updateData.emailVerified = false;
	} else if (email === '' && currentUser.email) {
		// не трогаем email
	}

	updateData.birthDate = birthDate ? new Date(birthDate) : null;
	updateData.gender = gender || null;

	await prisma.user.update({
		where: { id: userId },
		data: updateData,
	});

	return { success: true };
}