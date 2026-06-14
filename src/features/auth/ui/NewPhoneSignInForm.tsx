"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputMask } from "@react-input/mask";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/shared/lib";

const phoneSchema = z.object({
	phone: z.string().min(1, "Номер телефона обязателен"),
});

export function NewPhoneSignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(phoneSchema),
	});

	const sendOtpMutation = useMutation({
		mutationFn: async (data: { phone: string }) => {
			const res = await authClient.phoneNumber.sendOtp({
				phoneNumber: data.phone,
			});
			return res;
		},
		onSuccess: () => {
			// Перенаправляем на страницу ввода OTP
			window.location.href = "/verify-otp";
		},
	});

	return (
		<form onSubmit={handleSubmit((data) => sendOtpMutation.mutate(data))}>
			<InputMask mask="+7 (___) ___-__-__" replacement={{ _: /\d/ }} {...register("phone")} />
			{errors.phone && <p>{errors.phone.message}</p>}
			<button type="submit" disabled={sendOtpMutation.isPending}>
				{sendOtpMutation.isPending ? "Отправка..." : "Получить код"}
			</button>
		</form>
	);
}