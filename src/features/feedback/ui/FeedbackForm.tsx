'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputFormText } from '@/shared/ui';
import { submitFeedback } from '../api/submitFeedback';
import { setServerErrors } from '@/shared/lib/form-utils';
import { toast } from 'sonner';
import { FeedbackFormValues, feedbackSchema } from '../model/feedbackSchema';

const TOPICS = ['Проблема с заказом', 'Вопрос по товару', 'Общие вопросы', 'Предложение'];

export function FeedbackForm() {
	const form = useForm<FeedbackFormValues>({
		resolver: zodResolver(feedbackSchema),
		defaultValues: { topic: '', message: '' },
	});

	const onSubmit = async (data: FeedbackFormValues) => {
		const result = await submitFeedback(data);
		if (result.error) {
			setServerErrors(form, result.error);
			return;
		}
		toast.success('Сообщение отправлено');
		form.reset();
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4">
				<div>
					<label className="block mb-1 font-medium">Тема обращения</label>
					<select
						{...form.register('topic')}
						className="w-full border rounded p-2"
					>
						<option value="">Выберите тему</option>
						{TOPICS.map((t) => (
							<option key={t} value={t}>{t}</option>
						))}
					</select>
					{form.formState.errors.topic && (
						<p className="text-red-500 text-sm mt-1">{form.formState.errors.topic.message}</p>
					)}
				</div>

				<InputFormText
					name="message"
					label="Сообщение"
					placeholder="Опишите вашу ситуацию..."
				// InputFormText не поддерживает textarea, поэтому используем просто textarea через register
				/>
				{/* Замена на textarea: */}
				<div>
					<label htmlFor="message" className="block mb-1 font-medium">Сообщение</label>
					<textarea
						id="message"
						{...form.register('message')}
						rows={5}
						placeholder="Опишите вашу ситуацию..."
						className="w-full border rounded p-2"
					/>
					{form.formState.errors.message && (
						<p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
					)}
				</div>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Отправка...' : 'Отправить'}
				</Button>
			</form>
		</FormProvider>
	);
}