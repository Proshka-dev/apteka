// features/auth/ui/OtpStep.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormOtp, InputFormText } from '@/shared/ui';
import { SignInOtpFormData, signInOtpSchema } from '../model/signInOtpSchema';
import { toast } from 'sonner';

interface SignInOtpStepProps {
	phone: string;
	onVerify: (code: string) => Promise<{ success: boolean; error?: string, isNetworkError?: boolean }>;
	onBack: () => void;
	disabled?: boolean;
}

export function SignInOtpStep({ phone, onVerify, onBack, disabled }: SignInOtpStepProps) {
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
				<p className="text-sm text-gray-600 mb-5">Код отправлен на {phone}</p>
				<div className='pb-3 flex items-center justify-center'>
					<InputFormOtp
						name={'code'}
						// label={'Введите код'}
						hideLabel
					/>
				</div>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting || disabled}
					variant={'primary-green-shadow'}
					size={'pill-50-bold-accent'}
					className={'text-xs w-fit px-15 self-center'}

				>
					{form.formState.isSubmitting ? 'Проверка...' : 'Войти'}
				</Button>
				<Button
					onClick={onBack}
					variant={'ghost-custom'}
					size={'pill-40-sans'}
					className={'w-fit self-center'}

				>
					Назад к вводу номера
				</Button>
				{/* <button type="button" className="text-sm text-blue-500 underline" onClick={onBack}>
					Назад к номеру
				</button> */}
			</form>
		</FormProvider>
	);
}