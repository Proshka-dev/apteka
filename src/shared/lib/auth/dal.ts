// src/shared/lib/dal.ts
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "../auth";

// Функция для получения текущей сессии с проверкой в БД
// cache() гарантирует, что за один рендер страницы будет выполнен только один запрос к БД, что повышает производительность
export const getServerSession = cache(async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session;
});

// Функция, которая требует авторизацию и возвращает сессию, иначе редирект
export const requireAuth = async () => {
	const session = await getServerSession();
	if (!session) {
		redirect("/login"); // Используем redirect из next/navigation
	}
	return session;
};

// Функция, которая требует права администратора
export const requireAdmin = async () => {
	const session = await requireAuth();
	if (session.user.role !== "admin") {
		redirect("/unauthorized"); // Или на главную страницу
	}
	return session;
};