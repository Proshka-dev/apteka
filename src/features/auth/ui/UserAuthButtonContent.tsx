// features/auth/ui/UserAuthButton.tsx
'use client'
import { AuthSession } from "@/shared/lib";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { ButtonTopNav } from "@/widgets/Header/ui/ButtonTopNav";
import { useState } from "react";
import { PhoneSignInForm } from "./PhoneSignInForm";

interface UserAuthButtonContentProps {
	session: AuthSession | null;
}

export function UserAuthButtonContent({ session }: UserAuthButtonContentProps) {
	const [open, setOpen] = useState(false);
	return (
		session ? (
			// Если сессия активна
			<ButtonTopNav
				href='/profile'
				iconName='person'
			>
				{session.user.name}
			</ButtonTopNav>

		) : (
			// Неавторизованный пользователь
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger
					render={(props) => (
						<Button {...props} variant="primary-outline" size="pill-40-sans">
							Вход / регистрация
						</Button>
					)}
				/>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Вход или регистрация</DialogTitle>
					</DialogHeader>
					<PhoneSignInForm onSuccess={() => { setOpen(false) }} />
				</DialogContent>
			</Dialog>
		)
	)
}
