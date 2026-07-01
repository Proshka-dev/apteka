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
import { translateAuthError } from '@/shared/lib';
import { isTempEmail } from '@/shared/lib/isTempEmail';

interface EmailChangeBlockProps {
	initialEmail: string;
}

export function EmailChangeBlock({ initialEmail }: EmailChangeBlockProps) {
	// Является ли исходный email временным?
	const tempEmail = isTempEmail(initialEmail);
	const initialFieldValue = tempEmail ? '' : initialEmail;

	const [currentEmail, setCurrentEmail] = useState(initialFieldValue);
	const [emailOtp, setEmailOtp] = useState('');
	const emailVer = useEmailVerification();

	const form = useForm<EmailChangeValues>({
		resolver: zodResolver(emailChangeSchema),
		defaultValues: { email: initialFieldValue },
	});

	const watchedEmail = form.watch('email') ?? '';
	const changed = watchedEmail !== currentEmail;

	const handleStart = async () => {
		if (!watchedEmail || watchedEmail === currentEmail) return;
		try {
			await updateEmailBeforeVerification(watchedEmail);
		} catch {
			toast.error('Не удалось обновить email');
			return;
		}
		emailVer.startVerification(watchedEmail);
	};

	const handleCancel = async () => {
		form.setValue('email', currentEmail);
		try {
			await updateEmailBeforeVerification(currentEmail);
		} catch {
			toast.error('Не удалось откатить email');
		}
		emailVer.reset();
		setEmailOtp('');
	};

	useEffect(() => {
		if (emailVer.step === 'success') {
			setCurrentEmail(watchedEmail);
			toast.success('Email подтверждён');
			emailVer.reset(); // сбрасываем статус, чтобы не срабатывало повторно
		}
	}, [emailVer.step, watchedEmail]);

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
				{changed && emailVer.step !== 'success' && (
					<div className="mt-2 flex flex-col gap-2">
						{emailVer.step === 'idle' && (
							<div className="flex gap-2">
								<Button
									type="button"
									variant="primary-outline"
									size="pill-40-bold-accent"
									onClick={handleStart}
								>
									Подтвердить email
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
						{emailVer.step === 'sent' && (
							<>
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
										onClick={() => emailVer.startVerification(emailVer.lastEmail)}
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
							</>
						)}
						{emailVer.step === 'verifying' && <p>Проверка...</p>}
						{emailVer.error && <p className="text-red-500 text-sm">{translateAuthError(emailVer.error)}</p>}
					</div>
				)}
				{emailVer.step === 'success' && (
					<p className="text-green-600 text-sm">Email подтверждён</p>
				)}
			</div>
		</FormProvider>
	);
}