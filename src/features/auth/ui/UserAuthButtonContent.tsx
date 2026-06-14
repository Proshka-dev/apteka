// features/auth/ui/UserAuthButton.tsx
'use client'
import { AuthSession } from "@/shared/lib";

interface UserAuthButtonContentProps {
	session: AuthSession | null;
}

export function UserAuthButtonContent({ session }: UserAuthButtonContentProps) {
	return (
		session ? (
			<div>{session.user.name}</div >
		) : (
			<div>Вход/регистрация</div>
		)
	)
}
