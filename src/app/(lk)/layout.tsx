// app/(profile)/layout.tsx
import { requireAuth } from '@/shared/lib/auth/dal';

export default async function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Проверка авторизации – перенаправит на /login, если сессии нет
	const session = await requireAuth();

	return (
		<div className="container mx-auto p-4 md:p-8">
			<h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
			{session.user.name && (
				<p className="text-sm text-gray-600 mb-8">
					Здравствуйте, {session.user.name}
				</p>
			)}
			<div className="flex flex-col md:flex-row gap-8">
				{/* Боковое меню (клиентский компонент) */}
				<aside className="w-full md:w-64 shrink-0">
					{/* <ProfileMenu /> */}
					меню профиля
				</aside>
				{/* Содержимое страниц */}
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}