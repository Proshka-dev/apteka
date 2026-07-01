// features/edit-personal-data/lib/useEmailVerification.ts
import { useState, useEffect, useCallback } from 'react';
import { authClient } from '@/shared/lib';
import { toast } from 'sonner';

type Step = 'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error';

export function useEmailVerification() {
	const [step, setStep] = useState<Step>('idle');
	const [lastEmail, setLastEmail] = useState('');
	const [error, setError] = useState('');
	const [secondsLeft, setSecondsLeft] = useState(0);

	useEffect(() => {
		if (secondsLeft <= 0) return;
		const timer = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [secondsLeft]);

	const startVerification = useCallback(async (email: string) => {
		setLastEmail(email);
		setStep('sending');
		setError('');
		try {
			const response = await authClient.emailOtp.sendVerificationOtp({ email, type: 'email-verification' });
			if (response.error) {
				// Извлекаем сообщение: может быть строкой или объектом с полем message
				const message = typeof response.error === 'object' && response.error.message
					? response.error.message
					: 'Не удалось отправить код';
				// Логируем только если есть непустое сообщение
				if (response.error.message) {
					console.error('[useEmailVerification] Ошибка в ответе:', response.error);
				}
				setError(message);
				setStep('error');
				return;
			}
			setStep('sent');
			setSecondsLeft(60);
		} catch {
			setError('Сетевая ошибка при отправке кода');
			setStep('error');
		}
	}, []);

	const verify = useCallback(async (code: string) => {
		setStep('verifying');
		setError('');
		try {
			const response = await authClient.emailOtp.verifyEmail({
				email: lastEmail,
				otp: code,
			});
			if (response.error) {
				setError(response.error.message || 'Неверный код');
				setStep('sent');
				return;
			}
			setStep('success');
			toast.success('Email подтверждён');
		} catch {
			setError('Ошибка при проверке кода');
			setStep('sent');
		}
	}, [lastEmail]);

	const reset = useCallback(() => {
		setStep('idle');
		setLastEmail('');
		setError('');
		setSecondsLeft(0);
	}, []);

	return { step, lastEmail, error, secondsLeft, startVerification, verify, reset };
}