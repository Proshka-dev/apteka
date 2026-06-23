import { getUserById } from "@/entities/user";
import { UserDataForm } from "@/features/edit-user-data";
import { requireAuth } from "@/shared/lib/auth/dal";

export async function UserPage() {
	const session = await requireAuth();
	const user = await getUserById(session.user.id);
	return (
		<UserDataForm user={user} />
	);
}
