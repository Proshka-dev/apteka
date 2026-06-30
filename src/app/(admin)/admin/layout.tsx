// app/(admin)/admin/layout.tsx

import { requireAdmin } from "@/shared/lib/auth/dal";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	await requireAdmin(); // редирект на /unauthorized, если не админ
	return <>{children}</>;
}