import { getUserById, GetUserByIdResponse } from "@/entities/user";
import { UserDataForm } from "@/features/edit-user-data";
import { requireAuth } from "@/shared/lib/auth/dal";

export async function UserPage() {
	const session = await requireAuth();
	const user: GetUserByIdResponse | null = await getUserById(session.user.id);

	if (!user) return <div>Пользователь не найден</div>;

	return (
		<UserDataForm user={user} />
	);
}
