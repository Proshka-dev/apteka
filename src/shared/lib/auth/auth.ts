import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin"; // <-- Импортируем плагин admin
import { phoneNumber } from "better-auth/plugins/phone-number";
import { prisma } from "../prisma";
// import { sendSMS } from "@better-auth/infra/sms"; // <-- Импортируем утилиту для отправки SMS

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	secret: process.env.BETTER_AUTH_SECRET!,
	url: process.env.BETTER_AUTH_URL!,
	emailAndPassword: {
		enabled: true, // Включаем вход по паролю
		autoSignIn: true,
	},

	// Настройки сессии (срок жизни 30 дней)
	session: {
		expiresIn: 60 * 60 * 24 * 30, // 30 дней в секундах
		updateAge: 60 * 60 * 24,      // Обновлять сессию каждый день при активности
	},

	plugins: [
		admin(), // <-- Подключаем плагин для управления ролями
		phoneNumber({
			// Функция для отправки SMS
			sendOTP: async ({ phoneNumber: to, code }) => {
				try {
					// await sendSMS({
					// 	to,
					// 	code,
					// 	template: "phone-verification", // Шаблон сообщения
					// });
					console.log(`[OTP] Отправлен код ${code} на номер ${to}`);
				} catch (error) {
					console.error(`[OTP] Ошибка отправки на ${to}:`, error);
					throw new Error("Не удалось отправить SMS. Попробуйте позже.");
				}
			},
			// Автоматически создаем пользователя при успешной верификации номера
			signUpOnVerification: {
				// Временная заглушка для email, т.к. он обязателен в схеме
				getTempEmail: (phoneNumber) => `${phoneNumber}@temp.user`,
			},
		}),
	],

	// Настройка advanced опций (опционально, но полезно для безопасности)
	advanced: {
		// Явно разрешаем вход по номеру телефона из API
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
		},
		// Поддерживаем вход по номеру телефона
		generateId: {
			// Эта настройка позволит использовать номер телефона как провайдер для signIn
			// Она требуется, чтобы корректно работал authClient.signIn.phoneNumber
			// Без него будет ошибка "Credential account not found"[reference:1]
		},
	},
});