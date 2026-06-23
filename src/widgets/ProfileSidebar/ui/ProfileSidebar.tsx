'use client';
import { usePathname } from 'next/navigation';
import { authClient } from '@/shared/lib/auth/client';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import { AuthSession } from '@/shared/lib';

export function ProfileSidebar({ session }: { session: AuthSession }) {
	const pathname = usePathname();

	const links = [
		{ href: '/user', label: 'Личные данные' },
		{ href: '/user/orders', label: 'Ваши заказы' },
		{ href: '/user/feedback', label: 'Обратная связь' },
	];

	const handleLogout = async () => {
		await authClient.signOut();
		window.location.href = '/';
	};

	return (
		<aside className="w-64 border-r p-4 flex flex-col">
			<div className="font-semibold mb-4">{session.user.name || 'Пользователь'}</div>
			<nav className="flex flex-col gap-2 flex-1">
				{links.map((link) => (
					<Link key={link.href} href={link.href}>
						<Button variant={pathname === link.href ? 'default' : 'ghost'} className="w-full justify-start">
							{link.label}
						</Button>
					</Link>
				))}
			</nav>
			<Button variant="primary-outline" onClick={handleLogout} className="mt-auto">
				Выйти
			</Button>
		</aside>
	);
}