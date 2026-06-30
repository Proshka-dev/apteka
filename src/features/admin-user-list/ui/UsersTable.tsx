// features/admin-user-list/ui/UsersTable.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getUsersForAdmin } from '@/entities/user/api/getUsersForAdmin';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui';
import { Badge } from '@/shared/ui';

export function UsersTable() {
	const { data: users, isLoading, error } = useQuery({
		queryKey: ['admin-users'],
		queryFn: getUsersForAdmin,
		staleTime: 30_000, // данные считаются свежими 30 секунд
	});

	if (isLoading) return <div>Загрузка пользователей...</div>;
	if (error) return <div className="text-red-500">Ошибка загрузки: {error.message}</div>;
	if (!users || users.length === 0) return <div>Нет пользователей.</div>;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Имя</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Телефон</TableHead>
					<TableHead>Роль</TableHead>
					<TableHead>Email подтверждён</TableHead>
					<TableHead>Телефон подтверждён</TableHead>
					<TableHead>Дата регистрации</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name || '—'}</TableCell>
						<TableCell>{user.email || '—'}</TableCell>
						<TableCell>{user.phoneNumber || '—'}</TableCell>
						<TableCell>
							<Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
								{user.role || 'user'}
							</Badge>
						</TableCell>
						<TableCell>{user.emailVerified ? '✅' : '❌'}</TableCell>
						<TableCell>{user.phoneNumberVerified ? '✅' : '❌'}</TableCell>
						<TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}