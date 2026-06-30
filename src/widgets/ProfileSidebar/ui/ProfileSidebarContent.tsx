// widgets/profile-sidebar/ui/ProfileSidebarClient.tsx
'use client';
import { usePathname } from 'next/navigation';
import { authClient } from '@/shared/lib';
import Link from 'next/link';
import { Button } from '@/shared/ui';

interface ProfileSidebarContentProps {
	userName: string;
	isAdmin: boolean;
}

export function ProfileSidebarContent({ userName, isAdmin }: ProfileSidebarContentProps) {
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
			<div className="font-semibold mb-4">{userName}</div>
			<nav className="flex flex-col gap-2 flex-1">
				{links.map((link) => (
					<Link key={link.href} href={link.href}>
						<Button variant={pathname === link.href ? 'default' : 'ghost'} className="w-full justify-start">
							{link.label}
						</Button>
					</Link>
				))}

				{isAdmin && (
					<Link href="/admin/users">
						<Button variant={pathname === '/admin/users' ? 'default' : 'ghost'} className="w-full justify-start">
							Список пользователей (админ)
						</Button>
					</Link>
				)}
			</nav>
			<Button variant="primary-outline" onClick={handleLogout} className="mt-auto">
				Выйти
			</Button>
		</aside>
	);
}