import { zodResolver } from "@hookform/resolvers/zod";
import { CallbackFormData, callbackSchema } from "../model/callbackSchema";
import { useForm, Controller } from "react-hook-form";
import { Button, Field, FieldError, FieldLabel, Input, SheetClose } from "@/shared/ui";
import Link from "next/link";
import { submitCallback } from "../api/submitCallback";
import { setServerErrors } from "@/shared/lib";

interface CallbackDialogContentProps {
	setOpen: (val: boolean) => void;
}

export function CallbackDialogContent({ setOpen }: CallbackDialogContentProps) {

	const form = useForm<CallbackFormData>({
		resolver: zodResolver(callbackSchema),
		defaultValues: { name: "", phone: "" },
	});

	const onSubmit = async (data: CallbackFormData) => {
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
			// опционально показать тост «Спасибо, мы перезвоним»
		}
	};



	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" id="form-callback">
			<div className="font-bold text-lg font-accent">Мы вам перезвоним</div>
			<div className="font-sans text-cust-gray">Оставьте ваши данные...</div>

			<div className="flex flex-col gap-5">
				<div>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-callback-name">Имя</FieldLabel>
								<Input
									{...field}
									id="form-callback-name"
									aria-invalid={fieldState.invalid}
									placeholder="Ваше имя"
								/>
								<div className="min-h-5">
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</div>

							</Field>
						)}
					/>
				</div>
				<div>
					<Controller
						name="phone"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-callback-name">Телефон</FieldLabel>
								<Input
									{...field}
									id="form-callback-name"
									aria-invalid={fieldState.invalid}
									placeholder="Телефон"
								/>
								<div className="min-h-5">
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</div>
							</Field>
						)}
					/>
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
				form="form-callback"
				variant="primary"
				size="pill-50-bold-accent"
				disabled={form.formState.isSubmitting}
			>
				{form.formState.isSubmitting ? 'Отправка...' : 'Перезвоните мне'}
			</Button>
		</form>
	)
}
