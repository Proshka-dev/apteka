'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormText, InputFormPhone } from '@/shared/ui';
import { setServerErrors } from '@/shared/lib/form-utils';
import { toast } from 'sonner';
import { UserDataFormValues, userDataSchema } from '../model/userDataSchema';
import { updateUserData } from '../api/updateUserData';

export function UserDataForm({ user }: { user: any }) {
	const form = useForm<UserDataFormValues>({
		resolver: zodResolver(userDataSchema),
		defaultValues: {
			name: user.name || '',
			phone: user.phoneNumber || '',
			email: user.email || '',
			// birthDate: user.birthDate?.toISOString().split('T')[0] || '',
		},
	});

	const onSubmit = async (data: UserDataFormValues) => {
		const result = await updateUserData(data);
		if (result.error) {
			setServerErrors(form, result.error);
			return;
		}
		toast.success('Данные сохранены');
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4">
				<InputFormText name="name" label="ФИО" placeholder="Иван Иванов" />
				<InputFormPhone name="phone" label="Телефон" placeholder="+7 (999) 999-99-99" />
				<InputFormText name="email" label="Email" placeholder="example@mail.ru" />
				<InputFormText name="birthDate" label="Дата рождения" placeholder="ГГГГ-ММ-ДД" />
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>
		</FormProvider>
	);
}