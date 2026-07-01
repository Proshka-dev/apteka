// features/edit-personal-data/ui/PhoneChangeBlock.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	InputFormPhone,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/shared/ui';
import { usePhoneVerification } from '../lib/usePhoneVerification';
import { toast } from 'sonner';
import { phoneChangeSchema, PhoneChangeValues } from '../model/phoneChangeSchema';
import { translateAuthError } from '@/shared/lib';
interface PhoneChangeBlockProps {
	initialPhone: string;
}

export function PhoneChangeBlock({ initialPhone }: PhoneChangeBlockProps) {
	const [currentPhone, setCurrentPhone] = useState(initialPhone);
	const [phoneOtp, setPhoneOtp] = useState('');
	const phoneVer = usePhoneVerification();

	const form = useForm<PhoneChangeValues>({
		resolver: zodResolver(phoneChangeSchema),
		defaultValues: { phone: initialPhone },
	});

	const watchedPhone = form.watch('phone');
	const changed = watchedPhone !== currentPhone;

	const handleCancel = () => {
		form.setValue('phone', currentPhone);
		phoneVer.reset();
		setPhoneOtp('');
	};

	const handleStart = () => {
		if (!watchedPhone || watchedPhone === currentPhone) return;
		phoneVer.startVerification(watchedPhone);
	};

	useEffect(() => {
		//при успешной верификации устанавливаем сurrentPhone = watchedPhone
		if (phoneVer.step === 'success') {
			setCurrentPhone(watchedPhone);
			toast.success('Телефон подтверждён и обновлён');
			phoneVer.reset(); // сбрасываем статус
		}
	}, [phoneVer.step, watchedPhone]);

	useEffect(() => {
		//автоматическая отмена при возврате поля к прежнему значению
		if (!changed && phoneVer.step !== 'idle' && phoneVer.step !== 'success') {
			handleCancel();
		}
	}, [changed]);

	return (
		<FormProvider {...form}>
			<div className="max-w-md flex flex-col gap-2">
				<InputFormPhone name="phone" label="Телефон" placeholder="+7 (999) 999-99-99" />
				{changed && phoneVer.step !== 'success' && (
					<div className="mt-2 flex flex-col gap-2">
						{phoneVer.step === 'idle' && (
							<div className="flex gap-2">
								<Button
									type="button"
									variant="primary-outline"
									size="pill-40-bold-accent"
									onClick={handleStart}
								>
									Подтвердить телефон
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
						{phoneVer.step === 'sent' && (
							<>
								<div className="flex justify-center mb-5">
									<InputOTP
										value={phoneOtp}
										onChange={setPhoneOtp}
										maxLength={6}
										id="phone-otp"
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
										disabled={phoneOtp.length < 6}
										onClick={() => phoneVer.verify(phoneOtp)}
									>
										Проверить код
									</Button>
									<Button
										type="button"
										variant="ghost-custom"
										size="pill-40-bold-accent"
										disabled={phoneVer.secondsLeft > 0}
										onClick={() => phoneVer.startVerification(phoneVer.lastPhone)}
									>
										{phoneVer.secondsLeft > 0
											? `Повторить через ${phoneVer.secondsLeft} сек`
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
						{phoneVer.step === 'verifying' && <p>Проверка...</p>}
						{phoneVer.error && <p className="text-red-500 text-sm">{translateAuthError(phoneVer.error)}</p>}
					</div>
				)}
				{phoneVer.step === 'success' && (
					<p className="text-green-600 text-sm">Телефон подтверждён</p>
				)}
			</div>
		</FormProvider>
	);
}