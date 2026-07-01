import { requireAuth } from "@/shared/lib/auth/dal";
import { ProfileSidebar } from "@/widgets/ProfileSidebar";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	await requireAuth(); // автоматически редиректит, если нет сессии

	return (
		<div className="flex flex-col sm:flex-row min-h-screen">
			<ProfileSidebar />
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}