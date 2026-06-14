// features/auth/ui/UserAuthButton.tsx

import { getServerSession } from "@/shared/lib/auth/dal";
import { UserAuthButtonContent } from "./UserAuthButtonContent";


export async function UserAuthButton() {
	const session = await getServerSession();
	return (
		<div>
			<UserAuthButtonContent session={session} />
		</div>
	)
}
