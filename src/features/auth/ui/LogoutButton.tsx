'use client'

import { authClient } from "@/shared/lib";
import { Button, ButtonProps } from "@/shared/ui";
import { useRouter } from "next/navigation";

type LogoutButtonProps = ButtonProps;

export function LogoutButton({ children }: LogoutButtonProps) {
	const router = useRouter();
	const { data: session, isPending, error } = authClient.useSession();

	function handleClick() {
		authClient.signOut();
		router.refresh()
	}

	return (
		<Button
			onClick={handleClick}
			disabled={!session}
		>
			{children}
		</Button>
	)
}
