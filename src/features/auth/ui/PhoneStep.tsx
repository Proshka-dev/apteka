// features/auth/ui/PhoneStep.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormPhone } from '@/shared/ui';
import { SignInPhoneFormData, signInPhoneSchema } from '../model/signInPhoneSchema';

interface PhoneStepProps {
	onSendOtp: (phone: string) => Promise<{ success: boolean; error?: string; isNetworkError?: boolean }>;
	disabled?: boolean;
}

export function PhoneStep({ onSendOtp, disabled }: PhoneStepProps) {
	const form = useForm<SignInPhoneFormData>({
		resolver: zodResolver(signInPhoneSchema),
		defaultValues: { phone: '' },
		disabled, // RHF сам заблокирует все поля и кнопку
	});

	const onSubmit = async (data: SignInPhoneFormData) => {
		const result = await onSendOtp(data.phone);
		if (!result.success && !result.isNetworkError) {
			form.setError('phone', { type: 'server', message: result.error });
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<InputFormPhone
					name="phone"
					label="Телефон"
					placeholder="+7 (999) 999-99-99"
					hideLabelOnDesktop
				/>
				<Button type="submit" disabled={form.formState.isSubmitting || disabled}>
					{form.formState.isSubmitting ? 'Отправка...' : 'Получить код'}
				</Button>
			</form>
		</FormProvider>
	);
}