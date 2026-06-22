'use client'

import { LogoutButton } from "@/features/auth/ui/LogoutButton";
import { authClient } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function HomePage() {

	const handleOtpSent = (phone: string) => {
		console.log('OTP отправлен на', phone);
		// перенаправьте на страницу верификации, либо отобразите форму ввода
	};

	const router = useRouter();

	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Главная страница
			{/* <StoreImage
				filePath="products/arbidol.webp"
				alt="Arbidol"
				width={150}
				height={150}
				preload
			/>*/}

			{/* <div className="border-2 bg-green-100 w-full p-5 rounded-4xl mb-5">
				<PhoneSignInForm
					onSuccess={() => {
						router.refresh(); // обновить серверный Header
					}}
				/>
			</div> */}




		</div >
	);
}
