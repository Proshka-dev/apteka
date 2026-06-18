// features/auth/ui/OtpStep.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormText } from '@/shared/ui';
import { SignInOtpFormData, signInOtpSchema } from '../model/signInOtpSchema';

interface OtpStepProps {
	phone: string;
	onVerify: (code: string) => Promise<void>;
	onBack: () => void;
};

export function OtpStep({ phone, onVerify, onBack }: OtpStepProps) {
	const form = useForm<SignInOtpFormData>({
		resolver: zodResolver(signInOtpSchema),
		defaultValues: { code: '' },
	});

	const onSubmit = async (data: SignInOtpFormData) => {
		try {
			await onVerify(data.code);
		} catch (error: any) {
			form.setError('code', {
				type: 'server',
				message: error?.message || 'Неверный код',
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<p className="text-sm text-gray-600">Код отправлен на {phone}</p>

				<InputFormText
					name="code"
					label="Код"
					placeholder="Введите код"
					maxLength={6}
					disabled={form.formState.isSubmitting}
				/>

				{form.formState.errors.code && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.code.message}
					</p>
				)}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Проверка...' : 'Войти'}
				</Button>

				<button
					type="button"
					className="text-sm text-blue-500 underline"
					onClick={onBack}
				>
					Назад к номеру
				</button>
			</form>
		</FormProvider>
	);
}