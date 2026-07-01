// features/edit-personal-data/ui/UserDataForm.tsx
'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormText, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { setServerErrors } from '@/shared/lib/form-utils';
import { updateUserData } from '../api/updateUserData';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GetUserByIdResponse } from '@/entities/user';
import { UserDataValues, userDataSchema } from '../model/userDataSchema';
import { formatDateForInput } from '@/shared/lib';

interface UserDataFormProps {
	user: GetUserByIdResponse;
}

export function UserDataForm({ user }: UserDataFormProps) {
	const genderOptions = [
		{ value: "", label: "Не указан" },
		{ value: "male", label: "Мужской" },
		{ value: "female", label: "Женский" },
	]

	const router = useRouter();

	const initialValues: UserDataValues = {
		name: user.name || '',
		birthDate: formatDateForInput(user.birthDate),
		gender: (user.gender as UserDataValues['gender']) || '',
	};

	const form = useForm<UserDataValues>({
		resolver: zodResolver(userDataSchema),
		defaultValues: initialValues,
	});

	const watchedName = form.watch('name');
	const watchedBirthDate = form.watch('birthDate');
	const watchedGender = form.watch('gender');

	const nameChanged = watchedName !== initialValues.name;
	const birthDateChanged = watchedBirthDate !== initialValues.birthDate;
	const genderChanged = watchedGender !== initialValues.gender;
	const hasChanges = nameChanged || birthDateChanged || genderChanged;

	const onSubmit = async (data: UserDataValues) => {
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

	const handleCancel = () => {
		form.reset(initialValues);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4">
				<InputFormText name="name" label="ФИО" placeholder="Не указано" />
				<InputFormText name="birthDate" label="Дата рождения" type="date" />

				<div>
					<label className="block mb-1 font-medium">Пол</label>
					<Controller
						name="gender"
						control={form.control}
						render={({ field }) => (
							<Select
								value={field.value || ''}
								onValueChange={field.onChange}
								items={genderOptions} // 👈 Обязательно для Base UI!
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Не указан" />
								</SelectTrigger>
								<SelectContent>
									{genderOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				<div className="flex gap-2">
					<Button
						type="submit"
						variant={'primary'}
						size={'pill-50-bold-accent'}
						className={'w-full'}
						disabled={form.formState.isSubmitting || !hasChanges}
					>
						{form.formState.isSubmitting ? 'Сохранение...' : 'Сохранить'}
					</Button>

					{hasChanges && (
						<Button
							type="button"
							variant="ghost-custom"
							size="pill-40-bold-accent"
							onClick={handleCancel}
						>
							Отмена
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	);
}