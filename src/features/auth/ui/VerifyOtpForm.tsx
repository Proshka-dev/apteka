"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/shared/lib";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui";

export function VerifyOtpForm({ phoneNumber }: { phoneNumber: string }) {
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState<"verify" | "set-password">("verify");
	const [error, setError] = useState<string | null>(null);

	const verifyMutation = useMutation({
		mutationFn: async (code: string) => {
			const { data, error } = await authClient.phoneNumber.verify({
				phoneNumber,
				code,
				disableSession: false, // Важно: создаем сессию сразу
			});
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: () => {
			setStep("set-password");
		},
		onError: (err: Error) => {
			setError(err.message);
		},
	});

	const setPasswordMutation = useMutation({
		mutationFn: async (password: string) => {
			// Используем кастомный эндпоинт (мы его создадим на шаге 6)
			const res = await fetch("/api/auth/set-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}
			return res.json();
		},
		onSuccess: () => {
			window.location.href = "/dashboard"; // Перенаправление после успеха
		},
		onError: (err: Error) => {
			setError(err.message);
		},
	});

	if (step === "verify") {
		return (
			<div>
				<InputOTP maxLength={6} onChange={setOtp}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<button onClick={() => verifyMutation.mutate(otp)} disabled={otp.length !== 6}>
					Подтвердить
				</button>
				{error && <div className="text-red-500">{error}</div>}
			</div>
		);
	}

	return (
		<div>
			<h3>Установите пароль для входа</h3>
			<form onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const password = formData.get("password") as string;
				setPasswordMutation.mutate(password);
			}}>
				<input name="password" type="password" placeholder="Новый пароль" />
				<button type="submit" disabled={setPasswordMutation.isPending}>
					Установить пароль
				</button>
			</form>
			{error && <div className="text-red-500">{error}</div>}
		</div>
	);
}