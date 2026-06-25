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
		console.log('[useEmailVerification] startVerification called with', email);
		setLastEmail(email);
		setStep('sending');
		setError('');
		try {
			const response = await authClient.emailOtp.sendVerificationOtp({
				email,
				type: 'email-verification',
			});
			console.log('[useEmailVerification] Ответ от sendVerificationOtp:', response);
			if (response.error) {
				console.error('[useEmailVerification] Ошибка в ответе:', response.error);
				setError(response.error.message || 'Не удалось отправить код');
				setStep('error');
				return;
			}
			setStep('sent');
			setSecondsLeft(60);
		} catch (e) {
			console.error('[useEmailVerification] Исключение при отправке OTP:', e);
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