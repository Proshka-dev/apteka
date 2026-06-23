import { FeedbackForm } from "@/features/feedback";

export function FeedbackPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Обратная связь</h1>
			<FeedbackForm />
		</div>
	);
}