import { zodResolver } from "@hookform/resolvers/zod";
import { CallbackFormData, callbackSchema } from "../model/callbackSchema";
import { useForm, Controller } from "react-hook-form";
import { Button, Field, FieldError, FieldLabel, Input, SheetClose } from "@/shared/ui";
import Link from "next/link";
import { submitCallback } from "../api/submitCallback";
import { setServerErrors } from "@/shared/lib";
import { useMask } from '@react-input/mask';
import { toast } from "sonner";

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
			// показать тост
			toast.success("Спасибо, мы Вам перезвоним!", { position: "top-center" })

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
						render={({ field, fieldState }) => {
							// 1. Создаём ref для маски
							const maskRef = useMask({
								mask: '+7 (___) ___-__-__',
								replacement: { _: /\d/ },
							});

							const setRefs = (node: HTMLInputElement | null) => {
								// Передаём node в field.ref (RHF) — поддерживает null
								field.ref(node);
								// Передаём node в maskRef.current; используем приведение или проверку
								if (node) {
									(maskRef as React.RefObject<HTMLInputElement>).current = node;
								}
							};

							return (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-callback-phone">Телефон</FieldLabel>
									<Input
										{...field}
										id="form-callback-phone"
										aria-invalid={fieldState.invalid}
										placeholder="+7 (999) 999-99-99"
										// 2. Объединяем ref из useMask и из RHF
										ref={setRefs}
									/>
									<div className="min-h-5">
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</div>
								</Field>
							);
						}}
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
