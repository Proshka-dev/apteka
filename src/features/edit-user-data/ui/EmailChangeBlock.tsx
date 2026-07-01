// features/edit-personal-data/ui/EmailChangeBlock.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	InputFormText,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/shared/ui';
import { useEmailVerification } from '../lib/useEmailVerification';
import { updateEmailBeforeVerification } from '../api/updateEmailBeforeVerification';
import { toast } from 'sonner';
import { emailChangeSchema, EmailChangeValues } from '../model/emailChangeSchema';
import { translateAuthError, isTempEmail } from '@/shared/lib';

interface EmailChangeBlockProps {
	initialEmail: string;
	initialEmailVerified: boolean;
}

export function EmailChangeBlock({ initialEmail, initialEmailVerified }: EmailChangeBlockProps) {
	const tempEmail = isTempEmail(initialEmail);
	const initialFieldValue = tempEmail ? '' : initialEmail;

	const [currentEmail, setCurrentEmail] = useState(initialFieldValue);
	const [emailVerified, setEmailVerified] = useState(initialEmailVerified);
	const [emailOtp, setEmailOtp] = useState('');
	const emailVer = useEmailVerification();

	const form = useForm<EmailChangeValues>({
		resolver: zodResolver(emailChangeSchema),
		defaultValues: { email: initialFieldValue },
		mode: 'onChange',
	});

	const watchedEmail = form.watch('email') ?? '';
	const changed = watchedEmail !== currentEmail;
	const isValid = form.formState.isValid && watchedEmail !== '';

	// Сохранить новый email без верификации
	const handleSave = async () => {
		if (!isValid) return;
		try {
			await updateEmailBeforeVerification(watchedEmail);
			setCurrentEmail(watchedEmail);
			setEmailVerified(false);
			toast.success('Email сохранён');
		} catch {
			toast.error('Не удалось сохранить email');
		}
	};

	// Отмена редактирования (возвращает поле к currentEmail и сбрасывает OTP, если активен)
	const handleCancel = () => {
		form.setValue('email', currentEmail);
		emailVer.reset();
		setEmailOtp('');
	};

	// Запуск верификации сохранённого email
	const handleStartVerification = () => {
		emailVer.startVerification(currentEmail);
	};

	// Обработка успешной верификации
	useEffect(() => {
		if (emailVer.step === 'success') {
			setEmailVerified(true);
			toast.success('Email подтверждён');
			emailVer.reset();
		}
	}, [emailVer.step]);

	// Автоматическая отмена, если значение вернулось к currentEmail во время процесса OTP
	useEffect(() => {
		if (!changed && emailVer.step !== 'idle' && emailVer.step !== 'success') {
			handleCancel();
		}
	}, [changed]);

	return (
		<FormProvider {...form}>
			<div className="max-w-md flex flex-col gap-2">
				<InputFormText
					name="email"
					label="Email"
					placeholder={tempEmail ? 'Введите настоящий email' : 'example@mail.ru'}
				/>

				{tempEmail && !changed && (
					<p className="text-xs text-muted-foreground">
						Сейчас используется временный email. Пожалуйста, укажите настоящий.
					</p>
				)}

				{/* Поле изменено, но ещё не сохранено */}
				{changed && (
					<div className="mt-2 flex gap-2">
						<Button
							type="button"
							variant="primary-outline"
							size="pill-40-bold-accent"
							onClick={handleSave}
							disabled={!isValid}
						>
							Сохранить email
						</Button>
						<Button
							type="button"
							variant="ghost-custom"
							size="pill-40-bold-accent"
							onClick={handleCancel}
						>
							Отмена
						</Button>
					</div>
				)}

				{/* Email сохранён, но не подтверждён */}
				{!changed && currentEmail && !emailVerified && (
					<div className="mt-2 flex flex-col gap-2">
						<p className="text-sm text-amber-600">Email не подтверждён</p>
						<Button
							type="button"
							variant="primary-outline"
							size="pill-40-bold-accent"
							onClick={handleStartVerification}
							disabled={emailVer.step === 'sending' || emailVer.step === 'sent'}
						>
							Подтвердить email
						</Button>
					</div>
				)}

				{/* Интерфейс OTP (показывается только когда процесс верификации активен) */}
				{(emailVer.step === 'sent' || emailVer.step === 'verifying') && (
					<div className="mt-2 flex flex-col gap-2">
						<p className="text-sm text-gray-600">Код отправлен на {currentEmail}</p>
						<div className="flex justify-center mb-5">
							<InputOTP
								value={emailOtp}
								onChange={setEmailOtp}
								maxLength={6}
								id="email-otp"
								aria-invalid={false}
							>
								<InputOTPGroup>
									{Array.from({ length: 6 }).map((_, i) => (
										<InputOTPSlot key={i} index={i} className="p-5 text-md" />
									))}
								</InputOTPGroup>
							</InputOTP>
						</div>
						<div className="flex gap-2">
							<Button
								type="button"
								variant="primary"
								size="pill-40-bold-accent"
								disabled={emailOtp.length < 6}
								onClick={() => emailVer.verify(emailOtp)}
							>
								Проверить код
							</Button>
							<Button
								type="button"
								variant="ghost-custom"
								size="pill-40-bold-accent"
								disabled={emailVer.secondsLeft > 0}
								onClick={() => emailVer.startVerification(currentEmail)}
							>
								{emailVer.secondsLeft > 0
									? `Повторить через ${emailVer.secondsLeft} сек`
									: 'Отправить повторно'}
							</Button>
							<Button
								type="button"
								variant="ghost-custom"
								size="pill-40-bold-accent"
								onClick={handleCancel}
							>
								Отмена
							</Button>
						</div>
						{emailVer.error && (
							<p className="text-red-500 text-sm">{translateAuthError(emailVer.error)}</p>
						)}
					</div>
				)}

				{/* {emailVerified && (
					<p className="text-green-600 text-sm">Email подтверждён</p>
				)} */}
			</div>
		</FormProvider>
	);
}