import { auth } from "@/shared/lib";
import { headers } from "next/headers";
import { z } from "zod";

const passwordSchema = z.object({
	password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export async function POST(request: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return new Response(JSON.stringify({ message: "Не авторизован" }), { status: 401 });
		}

		const body = await request.json();
		const { password } = passwordSchema.parse(body);

		await auth.api.setPassword({
			headers: await headers(),
			body: {
				newPassword: password,
			},
		});

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error("[Set Password Error]", error);

		// Исправлено: используем error.issues вместо error.errors
		if (error instanceof z.ZodError) {
			const message = error.issues[0]?.message || "Ошибка валидации";
			return new Response(JSON.stringify({ message }), { status: 400 });
		}

		return new Response(JSON.stringify({ message: "Внутренняя ошибка сервера" }), { status: 500 });
	}
}