import { zodResolver } from "@hookform/resolvers/zod";
import { CallbackFormData, callbackSchema } from "../model/callbackSchema";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button, Field, FieldError, FieldLabel, Input, InputFormPhone, InputFormText, SheetClose } from "@/shared/ui";
import Link from "next/link";
import { submitCallback } from "../api/submitCallback";
import { setServerErrors, usePhoneMask } from "@/shared/lib";
import { useMask } from '@react-input/mask';
import { toast } from "sonner";
import React from "react";

interface CallbackDialogContentProps {
	setOpen: (val: boolean) => void;
}

export function CallbackDialogContent({ setOpen }: CallbackDialogContentProps) {

	const form = useForm<CallbackFormData>({
		resolver: zodResolver(callbackSchema),
		defaultValues: { name: "", phone: "" },
	});

	const onSubmit = async (data: CallbackFormData) => {
		try {
			const result = await submitCallback(data);

			if (result.error) {
				// Обрабатываем серверные ошибки валидации
				setServerErrors(form, result.error);
				return;
			}

			if (result.serverError) {
				// можно показать общую ошибку, например в алерте
				form.setError('root', { type: 'server', message: result.serverError });
				return;
			}

			if (result.success) {
				form.reset();          // очистить поля
				setOpen(false);   // закрыть диалог
				// показать тост
				toast.success("Спасибо, мы Вам перезвоним!", { position: "top-center" })

			}
		} catch {
			// Неожиданное исключение: сеть, баг в нормализации
			form.setError('root', {
				type: 'server',
				message: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.'
			});
		}
	};



	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" id="form-callback">
				<div className="font-bold text-lg font-accent">Мы вам перезвоним</div>
				<div className="font-sans text-cust-gray text-sm">Оставьте ваши данные и мы свяжемся с вами. Мы не занимаемся рассылкой рекламных сообщений, а так же не передаем контактные данные третьим лицам</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<div className="flex-1">
						<InputFormText
							name="name"
							label="Имя"
							placeholder="Ваше имя"
							hideLabelOnDesktop
						/>
					</div>
					<div className="flex-1">
						<InputFormPhone
							name="phone"
							label="Телефон"
							placeholder="+7 (999) 999-99-99"
							hideLabelOnDesktop
						/>
					</div>
					<div className="hidden lg:block lg:flex-1">
						<Button
							type="submit"
							form="form-callback"
							variant="primary"
							size="pill-50-bold-accent"
							disabled={form.formState.isSubmitting}
							className={'w-full'}
						>
							{form.formState.isSubmitting ? 'Отправка...' : 'Перезвоните мне'}
						</Button>

					</div>
				</div>

				<div className="font-sans text-xs text-cust-gray md:text-sm">
					Нажимая на кнопку, вы соглашаетесь на обработку{' '}
					<SheetClose>
						<Link href={'/personal'} className="text-cust-mint">персональных данных</Link>
					</SheetClose>
				</div>

				<Button
					type="submit"
					form="form-callback"
					variant="primary"
					size="pill-50-bold-accent"
					disabled={form.formState.isSubmitting}
					className={'lg:hidden'}
				>
					{form.formState.isSubmitting ? 'Отправка...' : 'Перезвоните мне'}
				</Button>
			</form>
		</FormProvider>
	)
}
