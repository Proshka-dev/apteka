import { requireAuth } from "@/shared/lib/auth/dal";
import { ProfileSidebar } from "@/widgets/ProfileSidebar";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	const session = await requireAuth(); // автоматически редиректит, если нет сессии

	return (
		<div className="flex min-h-screen">
			<ProfileSidebar session={session} />
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}