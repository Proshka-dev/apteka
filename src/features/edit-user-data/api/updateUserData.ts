'use server';
import { prisma } from '@/shared/lib/prisma';
import { UserDataFormValues, userDataSchema } from '../model/userDataSchema';
import { requireAuth } from '@/shared/lib/auth/dal';

export async function updateUserData(data: UserDataFormValues) {
	const session = await requireAuth();
	const parsed = userDataSchema.safeParse(data);
	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	await prisma.user.update({
		where: { id: session.user.id },
		data: {
			name: parsed.data.name,
			phoneNumber: parsed.data.phone, // или нормализованный номер
			// email: parsed.data.email || null,
			// birthDate: parsed.data.birthDate ? new Date(parsed.data.birthDate) : null,
		},
	});

	return { success: true };
}