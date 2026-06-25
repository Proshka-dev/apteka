// features/edit-personal-data/lib/usePhoneVerification.ts
import { useState, useEffect, useCallback } from 'react';
import { authClient } from '@/shared/lib';
import { toast } from 'sonner';

type Step = 'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error';

export function usePhoneVerification() {
	const [step, setStep] = useState<Step>('idle');
	const [lastPhone, setLastPhone] = useState('');
	const [error, setError] = useState('');
	const [secondsLeft, setSecondsLeft] = useState(0);

	// Таймер обратного отсчёта
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

	const startVerification = useCallback(async (phone: string) => {
		setLastPhone(phone);
		setStep('sending');
		setError('');
		try {
			const response = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
			if (response.error) {
				setError(response.error.message || 'Не удалось отправить код');
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
			const response = await authClient.phoneNumber.verify({
				phoneNumber: lastPhone,
				code,
				updatePhoneNumber: true,
			});
			if (response.error) {
				setError(response.error.message || 'Неверный код');
				setStep('sent');
				return;
			}
			setStep('success');
			toast.success('Телефон подтверждён и обновлён');
		} catch {
			setError('Ошибка при проверке кода');
			setStep('sent');
		}
	}, [lastPhone]);

	const reset = useCallback(() => {
		setStep('idle');
		setLastPhone('');
		setError('');
		setSecondsLeft(0);
	}, []);

	return { step, lastPhone, error, secondsLeft, startVerification, verify, reset };
}