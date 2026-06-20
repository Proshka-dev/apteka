// features/auth/ui/OtpStep.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormOtp, InputFormText } from '@/shared/ui';
import { SignInOtpFormData, signInOtpSchema } from '../model/signInOtpSchema';
import { toast } from 'sonner';

interface OtpStepProps {
	phone: string;
	onVerify: (code: string) => Promise<{ success: boolean; error?: string, isNetworkError?: boolean }>;
	onBack: () => void;
	disabled?: boolean;
}

export function OtpStep({ phone, onVerify, onBack, disabled }: OtpStepProps) {
	const form = useForm<SignInOtpFormData>({
		resolver: zodResolver(signInOtpSchema),
		defaultValues: { code: '' },
		disabled,
	});

	const onSubmit = async (data: SignInOtpFormData) => {
		const result = await onVerify(data.code);
		if (!result.success && !result.isNetworkError) {
			form.setError('code', { type: 'server', message: result.error });
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<p className="text-sm text-gray-600">Код отправлен на {phone}</p>
				{/* <InputFormText
					name="code"
					label="Код"
					placeholder="Введите код"
					maxLength={6}
				/> */}
				<InputFormOtp
					name={'code'}
					label={'Код'}

				/>
				<Button type="submit" disabled={form.formState.isSubmitting || disabled}>
					{form.formState.isSubmitting ? 'Проверка...' : 'Войти'}
				</Button>
				<button type="button" className="text-sm text-blue-500 underline" onClick={onBack}>
					Назад к номеру
				</button>
			</form>
		</FormProvider>
	);
}