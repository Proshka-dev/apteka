// widgets/profile-sidebar/ui/ProfileSidebarServer.tsx
import { getServerSession } from '@/shared/lib/auth/dal';
import { ProfileSidebarContent } from './ProfileSidebarContent';

export async function ProfileSidebar() {
	const session = await getServerSession();
	const isAdmin = session?.user?.role === 'admin';
	const userName = session?.user?.name || 'Пользователь';

	return <ProfileSidebarContent userName={userName} isAdmin={isAdmin} />;
}