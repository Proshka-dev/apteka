// features/auth/ui/PhoneSignInForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/shared/lib/auth/client';
import { PhoneStep } from './PhoneStep';
import { OtpStep } from './OtpStep';

type Props = {
	onSuccess?: () => void;
};

export function PhoneSignInForm({ onSuccess }: Props) {
	const [step, setStep] = useState<'phone' | 'otp'>('phone');
	const [phone, setPhone] = useState('');
	const router = useRouter();

	const handleSendOtp = async (phoneNumber: string) => {
		// Отправляем запрос на генерацию OTP
		await authClient.phoneNumber.sendOtp({ phoneNumber });
		setPhone(phoneNumber);
		setStep('otp');
	};

	const handleVerify = async (code: string) => {
		// Верифицируем OTP и создаём сессию
		await authClient.phoneNumber.verify({ phoneNumber: phone, code });
		// Обновляем серверные компоненты
		router.refresh();
		// Сообщаем родителю об успехе (закрыть диалог)
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