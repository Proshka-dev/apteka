'use client'

import { PhoneSignInForm } from "@/features/auth/ui/demo/PhoneSignInForm";
import { RequestOtpForm } from "@/features/auth/ui/demo/RequestOtpForm";
import { VerifyOtpForm } from "@/features/auth/ui/demo/VerifyOtpForm";
import { authClient } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { phoneNumber } from "better-auth/plugins";
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

			<div className="border-2 bg-green-100 w-full p-5 rounded-4xl mb-5">
				<PhoneSignInForm
					onSuccess={() => {
						router.refresh(); // обновить серверный Header
					}}
				/>
			</div>


			<div className="border-2 bg-green-100 w-full p-5 rounded-4xl mb-5">
				<RequestOtpForm onOtpSent={handleOtpSent} />
			</div>

			<div className="border-2 bg-blue-100 w-full p-5 rounded-4xl mb-5">
				{'903-123-45-67'}
				<VerifyOtpForm phoneNumber='+79031234567' />
			</div>

			<div>
				<Button onClick={() => { authClient.signOut(); }}>
					Выйти из аккаунта
				</Button>
			</div>



		</div >
	);
}
