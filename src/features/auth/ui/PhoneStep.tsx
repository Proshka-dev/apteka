// features/auth/ui/PhoneStep.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormPhone } from '@/shared/ui';
import { SignInPhoneFormData, signInPhoneSchema } from '../model/signInPhoneSchema';

interface PhoneStepProps {
	onSendOtp: (phone: string) => Promise<void>;
};

export function PhoneStep({ onSendOtp }: PhoneStepProps) {
	const form = useForm<SignInPhoneFormData>({
		resolver: zodResolver(signInPhoneSchema),
		defaultValues: { phone: '' },
	});

	const onSubmit = async (data: SignInPhoneFormData) => {
		try {
			await onSendOtp(data.phone);
		} catch (error: any) {
			form.setError('root', {
				type: 'server',
				message: error?.message || 'Не удалось отправить код',
			});
		}
	};

	return (
		//Провайдер для возможности использовать контекст формы в InputFormPhone
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<InputFormPhone
					name="phone"
					label="Телефон"
					placeholder="+7 (999) 999-99-99"
					hideLabelOnDesktop
					disabled={form.formState.isSubmitting}
				/>

				{form.formState.errors.root && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.root.message}
					</p>
				)}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Отправка...' : 'Получить код'}
				</Button>
			</form>
		</FormProvider>
	);
}