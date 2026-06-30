// features/edit-personal-data/ui/UserDataForm.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, InputFormText } from '@/shared/ui';
import { setServerErrors } from '@/shared/lib/form-utils';
import { updateUserData } from '../api/updateUserData';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GetUserByIdResponse } from '@/entities/user';
import { UserDataValues, userDataSchema } from '../model/userDataSchema';

interface UserDataFormProps {
	user: GetUserByIdResponse;
}

export function UserDataForm({ user }: UserDataFormProps) {
	const router = useRouter();

	const form = useForm<UserDataValues>({
		resolver: zodResolver(userDataSchema),
		defaultValues: {
			name: user.name || '',
			birthDate: user.birthDate?.toISOString()?.split('T')[0] || '',
			gender: user.gender || '',
		},
	});

	const onSubmit = async (data: UserDataValues) => {
		const result = await updateUserData({
			name: data.name,
			phone: undefined,
			email: undefined,
			birthDate: data.birthDate,
			gender: data.gender,
		});
		if (result?.error) {
			setServerErrors(form, result.error);
		} else {
			toast.success('Данные сохранены');
			router.refresh();
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4">
				<InputFormText name="name" label="ФИО" placeholder="Иван Иванов" />
				<InputFormText name="birthDate" label="Дата рождения" type="date" />

				<div>
					<label className="block mb-1 font-medium">Пол</label>
					<select {...form.register('gender')} className="w-full border rounded p-2">
						<option value="">Не указан</option>
						<option value="male">Мужской</option>
						<option value="female">Женский</option>
					</select>
				</div>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>
		</FormProvider>
	);
}