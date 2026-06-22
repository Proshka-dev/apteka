import { LogoutButton } from "@/features/auth/ui/LogoutButton";

export function UserPage() {
	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Личный кабинет пользователя (/user)
			<div>
				<LogoutButton>Выйти из аккаунта</LogoutButton>
			</div>

		</div >
	);
}
