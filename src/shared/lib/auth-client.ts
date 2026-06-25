import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!, // Ваш URL фронтенда
	plugins: [adminClient(), phoneNumberClient(), emailOTPClient()],
});

// Экспортируем типы и удобные методы
//export const { signIn, signOut, useSession, getSession, admin, phoneNumber } = authClient;
