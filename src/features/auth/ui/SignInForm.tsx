// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { authClient } from "@/shared/lib";

// const signInSchema = z.object({
// 	phoneNumber: z.string().min(10),
// 	password: z.string().optional(),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// export function SignInForm() {
// 	const [isOtpMode, setIsOtpMode] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const { register, handleSubmit, watch } = useForm<SignInFormData>({
// 		resolver: zodResolver(signInSchema),
// 	});
// 	const phoneNumber = watch("phoneNumber");

// 	const onSubmit = async (data: SignInFormData) => {
// 		setError(null);
// 		if (isOtpMode) {
// 			// Отправка OTP
// 			const { error } = await authClient.phoneNumber.sendOtp({
// 				phoneNumber: data.phoneNumber,
// 			});
// 			if (error) setError(error.message ?? "Ошибка входа");
// 			else {
// 				// Перенаправляем на страницу верификации OTP, передавая номер телефона
// 				window.location.href = `/verify-otf?phone=${encodeURIComponent(data.phoneNumber)}`;
// 			}
// 		} else {
// 			// Логин по паролю
// 			const { error } = await authClient.signIn.phoneNumber({
// 				phoneNumber: data.phoneNumber,
// 				password: data.password!,
// 			});
// 			if (error) setError(error.message ?? "Ошибка входа");
// 			else {
// 				window.location.href = "/dashboard";
// 			}
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			<input {...register("phoneNumber")} placeholder="Номер телефона" />
// 			{!isOtpMode && <input {...register("password")} type="password" placeholder="Пароль" />}
// 			<button type="submit">
// 				{isOtpMode ? "Отправить код" : "Войти"}
// 			</button>
// 			<button type="button" onClick={() => setIsOtpMode(!isOtpMode)}>
// 				{isOtpMode ? "Войти с паролем" : "Войти по коду из SMS"}
// 			</button>
// 			{error && <div className="text-red-500">{error}</div>}
// 		</form>
// 	);
// }