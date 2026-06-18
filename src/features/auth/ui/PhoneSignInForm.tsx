// features/auth/ui/PhoneSignInForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/shared/lib/auth/client';
import { PhoneStep } from './PhoneStep';
import { OtpStep } from './OtpStep';
import { toast } from 'sonner';

interface PhoneSignInFormProps {
	onSuccess?: () => void;
};

export function PhoneSignInForm({ onSuccess }: PhoneSignInFormProps) {
	const [step, setStep] = useState<'phone' | 'otp'>('phone');
	const [phone, setPhone] = useState('');
	const router = useRouter();

	const handleSendOtp = async (phoneNumber: string) => {

		let response;
		try {
			// Отправляем запрос на генерацию OTP
			response = await authClient.phoneNumber.sendOtp({ phoneNumber });
		} catch (_error) {
			// Этот catch сработает ТОЛЬКО при сетевой ошибке (например, упал интернет)
			toast.error('Произошла непредвиденная ошибка сети', { position: 'top-center' });
			throw new Error('Сетевой сбой. Попробуйте позже.');
		}

		// Обрабатываем бизнес-ошибку Better Auth вне блока try
		if (response.error) {
			throw new Error(response.error.message || 'Не удалось отправить код');
		}

		toast.success('Код отправлен', { position: 'top-center' });
		setPhone(phoneNumber);
		setStep('otp');
	};

	const handleVerify = async (code: string) => {
		let response;

		try {
			// Верифицируем OTP и создаём сессию
			response = await authClient.phoneNumber.verify({ phoneNumber: phone, code });
		} catch (_error) {
			toast.error('Произошла ошибка при верификации', { position: 'top-center' });
			throw new Error('Сетевой сбой при проверке кода.');
		}

		if (response.error) {
			throw new Error(response.error.message || 'Неверный код авторизации');
		}

		toast.success('Вход выполнен', { position: 'top-center' });
		router.refresh();
		onSuccess?.();
	};

	return (
		<div className="flex flex-col gap-4">
			{step === 'phone' ? (
				<PhoneStep onSendOtp={handleSendOtp} />
			) : (
				<OtpStep
					phone={phone}
					onVerify={handleVerify}
					onBack={() => setStep('phone')}
				/>
			)}
		</div>
	);
}