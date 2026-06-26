// features/edit-personal-data/ui/UserDataForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	InputFormText,
	InputFormPhone,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/shared/ui';
import { setServerErrors } from '@/shared/lib/form-utils';
import { toast } from 'sonner';
import { UserDataFormValues, userDataSchema } from '../model/userDataSchema';
import { updateUserData } from '../api/updateUserData';
import { usePhoneVerification } from '../lib/usePhoneVerification';
import { useEmailVerification } from '../lib/useEmailVerification';
import { useRouter } from 'next/navigation';
import { GetUserByIdResponse } from '@/entities/user';

interface UserDataFormProps {
	user: GetUserByIdResponse;
}

export function UserDataForm({ user }: UserDataFormProps) {
	const router = useRouter();

	const [initialPhone, setInitialPhone] = useState(user.phoneNumber || '');
	const [initialEmail, setInitialEmail] = useState(user.email || '');

	const phoneVer = usePhoneVerification();
	const emailVer = useEmailVerification();

	const [phoneOtp, setPhoneOtp] = useState('');
	const [emailOtp, setEmailOtp] = useState('');

	const form = useForm<UserDataFormValues>({
		resolver: zodResolver(userDataSchema),
		defaultValues: {
			name: user.name || '',
			phone: initialPhone,
			email: initialEmail,
			birthDate: user.birthDate?.toISOString()?.split('T')[0] || '',
			gender: user.gender || '',
		},
	});

	const watchedName = form.watch('name');
	const watchedPhone = form.watch('phone');
	const watchedEmail = form.watch('email');
	const watchedBirthDate = form.watch('birthDate');
	const watchedGender = form.watch('gender');

	const initialName = user.name || '';
	const initialBirthDate = user.birthDate?.toISOString()?.split('T')[0] || '';
	const initialGender = user.gender || '';

	const nameChanged = watchedName !== initialName;
	const birthDateChanged = watchedBirthDate !== initialBirthDate;
	const genderChanged = watchedGender !== initialGender;
	const phoneChanged = watchedPhone !== initialPhone;
	const emailChanged = watchedEmail !== initialEmail;

	useEffect(() => {
		if (phoneVer.step === 'success' && watchedPhone) setInitialPhone(watchedPhone);
	}, [phoneVer.step, watchedPhone]);

	useEffect(() => {
		if (emailVer.step === 'success' && watchedEmail) setInitialEmail(watchedEmail);
	}, [emailVer.step, watchedEmail]);

	const hasOtherChanges = nameChanged || birthDateChanged || genderChanged;
	const isPhonePending = phoneChanged && phoneVer.step !== 'success';
	const isEmailPending = emailChanged && emailVer.step !== 'success';
	const isSaveDisabled = isPhonePending || isEmailPending || !hasOtherChanges;

	const onSubmit = async (data: UserDataFormValues) => {
		const result = await updateUserData({
			name: data.name,
			phone: undefined,
			email: undefined,
			birthDate: data.birthDate,
			gender: data.gender,
		});
		if (result?.error) {
			setServerErrors(form, result.error);
		} else {
			toast.success('Данные сохранены');
			router.refresh();
		}
	};

	const handleStartPhoneVerification = () => {
		if (!watchedPhone || watchedPhone === initialPhone) return;
		phoneVer.startVerification(watchedPhone);
	};

	const handleStartEmailVerification = async () => {
		if (!watchedEmail || watchedEmail === initialEmail) return;
		try {
			const result = await updateUserData({
				name: form.getValues('name'),
				phone: form.getValues('phone'),
				email: watchedEmail,
				birthDate: form.getValues('birthDate'),
				gender: form.getValues('gender'),
			});
			if (result?.error) {
				setServerErrors(form, result.error);
				return;
			}
		} catch (e) {
			toast.error('Не удалось обновить email');
			return;
		}
		emailVer.startVerification(watchedEmail);
	};

	const cancelPhoneVerification = () => {
		form.setValue('phone', initialPhone);
		phoneVer.reset();
		setPhoneOtp('');
	};

	const cancelEmailVerification = () => {
		form.setValue('email', initialEmail);
		emailVer.reset();
		setEmailOtp('');
	};

	useEffect(() => {
		if (!phoneChanged && phoneVer.step !== 'idle' && phoneVer.step !== 'success') {
			phoneVer.reset();
			setPhoneOtp('');
		}
	}, [phoneChanged, phoneVer]);

	useEffect(() => {
		if (!emailChanged && emailVer.step !== 'idle' && emailVer.step !== 'success') {
			emailVer.reset();
			setEmailOtp('');
		}
	}, [emailChanged, emailVer]);

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4">
				<InputFormText name="name" label="ФИО" placeholder="Иван Иванов" />

				{/* Телефон */}
				<div>
					<InputFormPhone name="phone" label="Телефон" placeholder="+7 (999) 999-99-99" />
					{phoneChanged && phoneVer.step !== 'success' && (
						<div className="mt-2 flex flex-col gap-2">
							{phoneVer.step === 'idle' && (
								<div className="flex gap-2">
									<Button
										type="button"
										variant="primary-outline"
										size="pill-40-bold-accent"
										onClick={handleStartPhoneVerification}
									>
										Подтвердить телефон
									</Button>
									<Button
										type="button"
										variant="ghost-custom"
										size="pill-40-bold-accent"
										onClick={cancelPhoneVerification}
									>
										Отмена
									</Button>
								</div>
							)}
							{phoneVer.step === 'sent' && (
								<>
									<div className="flex justify-center">
										<InputOTP
											value={phoneOtp}
											onChange={setPhoneOtp}
											maxLength={6}
											id="phone-otp-input"
											aria-invalid={false}
										>
											<InputOTPGroup>
												{Array.from({ length: 6 }).map((_, index) => (
													<InputOTPSlot key={index} index={index} />
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
												? `Повторно через ${phoneVer.secondsLeft}с`
												: 'Отправить повторно'}
										</Button>
										<Button
											type="button"
											variant="ghost-custom"
											size="pill-40-bold-accent"
											onClick={cancelPhoneVerification}
										>
											Отмена
										</Button>
									</div>
								</>
							)}
							{phoneVer.step === 'verifying' && <p>Проверка...</p>}
							{phoneVer.error && <p className="text-red-500 text-sm">{phoneVer.error}</p>}
						</div>
					)}
					{phoneVer.step === 'success' && (
						<p className="text-green-600 text-sm mt-1">Телефон подтверждён</p>
					)}
				</div>

				{/* Email */}
				<div>
					<InputFormText name="email" label="Email" placeholder="example@mail.ru" />
					{emailChanged && emailVer.step !== 'success' && (
						<div className="mt-2 flex flex-col gap-2">
							{emailVer.step === 'idle' && (
								<div className="flex gap-2">
									<Button
										type="button"
										variant="primary-outline"
										size="pill-40-bold-accent"
										onClick={handleStartEmailVerification}
									>
										Подтвердить email
									</Button>
									<Button
										type="button"
										variant="ghost-custom"
										size="pill-40-bold-accent"
										onClick={cancelEmailVerification}
									>
										Отмена
									</Button>
								</div>
							)}
							{emailVer.step === 'sent' && (
								<>
									<div className="flex justify-center">
										<InputOTP
											value={emailOtp}
											onChange={setEmailOtp}
											maxLength={6}
											id="email-otp-input"
											aria-invalid={false}
										>
											<InputOTPGroup>
												{Array.from({ length: 6 }).map((_, index) => (
													<InputOTPSlot key={index} index={index} />
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
												? `Повторно через ${emailVer.secondsLeft}с`
												: 'Отправить повторно'}
										</Button>
										<Button
											type="button"
											variant="ghost-custom"
											size="pill-40-bold-accent"
											onClick={cancelEmailVerification}
										>
											Отмена
										</Button>
									</div>
								</>
							)}
							{emailVer.step === 'verifying' && <p>Проверка...</p>}
							{emailVer.error && <p className="text-red-500 text-sm">{emailVer.error}</p>}
						</div>
					)}
					{emailVer.step === 'success' && (
						<p className="text-green-600 text-sm mt-1">Email подтверждён</p>
					)}
				</div>

				<InputFormText name="birthDate" label="Дата рождения" placeholder="ГГГГ-ММ-ДД" />

				<div>
					<label className="block mb-1 font-medium">Пол</label>
					<select {...form.register('gender')} className="w-full border rounded p-2">
						<option value="">Не указан</option>
						<option value="male">Мужской</option>
						<option value="female">Женский</option>
					</select>
				</div>

				<Button
					type="submit"
					disabled={form.formState.isSubmitting || isSaveDisabled}
				>
					{form.formState.isSubmitting ? 'Сохранение...' : 'Сохранить'}
				</Button>

				{isPhonePending && (
					<p className="text-sm text-amber-600 text-center">
						Подтвердите новый номер телефона
					</p>
				)}
				{isEmailPending && (
					<p className="text-sm text-amber-600 text-center">
						Подтвердите новый адрес электронной почты
					</p>
				)}
				{!isPhonePending && !isEmailPending && !hasOtherChanges && (
					<p className="text-sm text-gray-500 text-center">
						Нет изменений для сохранения
					</p>
				)}
			</form>
		</FormProvider>
	);
}