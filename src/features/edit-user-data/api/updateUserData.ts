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

	console.log('data', data);
	console.log('parsed.data', parsed.data);

	await prisma.user.update({
		where: { id: session.user.id },
		data: {
			name: parsed.data.name,
			phoneNumber: parsed.data.phone,
			// при undefined prisma пропустит это значение и не будет его обновлять
			email: parsed.data.email === '' ? undefined : parsed.data.email,
			birthDate: parsed.data.birthDate ? new Date(parsed.data.birthDate) : null,
			gender: parsed.data.gender || null,  // если пустая строка — ставим null
		},
	});

	return { success: true };
}