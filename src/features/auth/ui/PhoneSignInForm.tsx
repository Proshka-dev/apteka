// features/auth/ui/PhoneSignInForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/shared/lib/auth/client';
import { PhoneStep } from './PhoneStep';
import { OtpStep } from './OtpStep';
import { toast } from 'sonner';
import { translateAuthError } from '../lib/translateAuthError';

interface PhoneSignInFormProps {
	onSuccess?: () => void;
};

export function PhoneSignInForm({ onSuccess }: PhoneSignInFormProps) {
	const [step, setStep] = useState<'phone' | 'otp'>('phone');
	const [phone, setPhone] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSendOtp = async (phoneNumber: string) => {
		setIsLoading(true);
		try {
			const response = await authClient.phoneNumber.sendOtp({ phoneNumber });

			//Если ошибка во время отправки
			if (response.error) {
				return { success: false, error: translateAuthError(response.error.message) || 'Не удалось отправить код' };
			}

			//Успешная отправка кода
			toast.success('Код отправлен', { position: 'top-center' });
			setPhone(phoneNumber);
			setStep('otp');
			return { success: true };
		} catch {
			toast.error('Произошла ошибка сети', { position: 'top-center' });
			return { success: false, error: 'Сетевой сбой. Попробуйте позже.', isNetworkError: true };
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerify = async (code: string) => {
		setIsLoading(true);
		try {
			const response = await authClient.phoneNumber.verify({ phoneNumber: phone, code });
			if (response.error) {
				return { success: false, error: translateAuthError(response.error.message) || 'Неверный код' };
			}
			toast.success('Вход выполнен', { position: 'top-center' });
			router.refresh();
			onSuccess?.();
			return { success: true };
		} catch {
			toast.error('Сетевой сбой. Попробуйте позже.', { position: 'top-center' });
			return { success: false, error: 'Сетевой сбой. Попробуйте позже.', isNetworkError: true };
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{step === 'phone' ? (
				<PhoneStep onSendOtp={handleSendOtp} disabled={isLoading} />
			) : (
				<OtpStep phone={phone} onVerify={handleVerify} onBack={() => setStep('phone')} disabled={isLoading} />
			)}
		</div>
	);
}