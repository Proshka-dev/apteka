import { UsersTable } from "@/features/admin-user-list";

export async function UsersListPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Пользователи</h1>
			<UsersTable />
		</div>);
}
