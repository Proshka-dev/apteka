'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitCallback } from '@/features/request-callback/api/submitCallback';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/lib';
import { Button, Icon, Input, Sheet, SheetClose, SheetContent, SheetTrigger } from '@/shared/ui';
import Link from 'next/link';
import { callbackSchema, CallbackFormData } from '../model/callbackSchema';

export function RequestCallbackDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<CallbackFormData>({
		resolver: zodResolver(callbackSchema),
	});

	useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);

	const onSubmit = async (data: CallbackFormData) => {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('phone', data.phone);
		const result = await submitCallback(formData);

		if (result.error) {
			// Обрабатываем серверные ошибки валидации
			Object.entries(result.error).forEach(([field, messages]) => {
				setError(field as keyof CallbackFormData, { message: messages?.[0] });
			});
			return;
		}

		if (result.success) {
			reset();          // очистить поля
			setOpen(false);   // закрыть диалог
			// опционально показать тост «Спасибо, мы перезвоним»
		}
	};

	return (
		<div className='flex md:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger render={
					<Button
						className={'w-full px-2.5'}
						variant={"primary"}
						size={"full-40-primary-shadow"}
					>
						<div className="flex gap-2.5">
							<Icon name="chevronDuoDownIcon" className="size-5" />
							<div>Мы вам перезвоним</div>
						</div>

					</Button>
				}
				/>
				<SheetContent side="top" className='md:hidden p-5 gap-5' showCloseButton>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
						<div className="font-bold text-lg font-accent">Мы вам перезвоним</div>
						<div className="font-sans text-cust-gray">Оставьте ваши данные...</div>

						<div className="flex flex-col gap-5">
							<div>
								<Input placeholder="Ваше имя" {...register('name')} />
								{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
							</div>
							<div>
								<Input placeholder="Телефон" {...register('phone')} />
								{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
							</div>
						</div>

						<div className="font-sans text-xs text-cust-gray">
							Нажимая на кнопку, вы соглашаетесь на обработку{' '}
							<SheetClose>
								<Link href={'/personal'} className="text-cust-mint">персональных данных</Link>
							</SheetClose>
						</div>

						<Button
							type="submit"
							variant="primary"
							size="pill-50-bold-accent"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Отправка...' : 'Перезвоните мне'}
						</Button>
					</form>
				</SheetContent>
			</Sheet>
		</div>
	);
}