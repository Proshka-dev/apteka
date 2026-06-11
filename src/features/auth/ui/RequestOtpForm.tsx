// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { authClient } from "@/shared/lib";
// import { useMutation } from "@tanstack/react-query";

// const phoneSchema = z.object({
// 	phoneNumber: z.string().min(10, "Введите корректный номер телефона"),
// });

// type PhoneFormData = z.infer<typeof phoneSchema>;

// export function RequestOtpForm({ onOtpSent }: { onOtpSent: (phone: string) => void }) {
// 	const [error, setError] = useState<string | null>(null);
// 	const { register, handleSubmit, formState: { errors } } = useForm<PhoneFormData>({
// 		resolver: zodResolver(phoneSchema),
// 	});

// 	const sendOtpMutation = useMutation({
// 		mutationFn: async (data: PhoneFormData) => {
// 			const { error } = await authClient.phoneNumber.sendOtp({
// 				phoneNumber: data.phoneNumber,
// 			});
// 			if (error) throw new Error(error.message);
// 			return data.phoneNumber;
// 		},
// 		onSuccess: (phoneNumber) => {
// 			onOtpSent(phoneNumber);
// 		},
// 		onError: (err: Error) => {
// 			setError(err.message);
// 		},
// 	});

// 	const onSubmit = (data: PhoneFormData) => {
// 		sendOtpMutation.mutate(data);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			<input {...register("phoneNumber")} placeholder="+7 123 456 78 90" />
// 			{errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
// 			{error && <div className="text-red-500">{error}</div>}
// 			<button type="submit" disabled={sendOtpMutation.isPending}>
// 				{sendOtpMutation.isPending ? "Отправка..." : "Получить код"}
// 			</button>
// 		</form>
// 	);
// }