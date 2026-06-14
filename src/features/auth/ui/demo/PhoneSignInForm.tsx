// features/auth/ui/PhoneSignInForm.tsx
'use client';
import { useState } from 'react';
import { authClient } from '@/shared/lib/auth/client';
import { Button, Input } from '@/shared/ui';

type Props = {
	onSuccess?: () => void;
};

export function PhoneSignInForm({ onSuccess }: Props) {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');
	const [step, setStep] = useState<'phone' | 'otp'>('phone');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const requestOTP = async () => {
		setLoading(true);
		setError('');
		try {
			// Правильный метод: sendOtp
			await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
			setStep('otp');
		} catch (e) {
			setError('Не удалось отправить код');
		} finally {
			setLoading(false);
		}
	};

	const verifyOTP = async () => {
		setLoading(true);
		setError('');
		try {
			// Правильный метод: verify
			await authClient.phoneNumber.verify({ phoneNumber: phone, code });
			onSuccess?.();
		} catch (e) {
			setError('Неверный код');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{step === 'phone' ? (
				<>
					<Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 999 123-45-67" />
					<Button onClick={requestOTP} disabled={loading}>{loading ? 'Отправка...' : 'Получить код'}</Button>
				</>
			) : (
				<>
					<Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Введите код" />
					<Button onClick={verifyOTP} disabled={loading}>{loading ? 'Проверка...' : 'Войти'}</Button>
					<button type="button" className="text-sm text-blue-500 underline" onClick={() => setStep('phone')}>Назад к номеру</button>
				</>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
}