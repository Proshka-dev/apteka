'use client'

import { RequestOtpForm } from "@/features/auth/ui/RequestOtpForm";
import { SignInForm } from "@/features/auth/ui/SignInForm";
import { VerifyOtpForm } from "@/features/auth/ui/VerifyOtpForm";
import { phoneNumber } from "better-auth/plugins";

export function HomePage() {

	const handleOtpSent = (phone: string) => {
		console.log('OTP отправлен на', phone);
		// перенаправьте на страницу верификации, либо отобразите форму ввода
	};

	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Главная страница
			{/* <StoreImage
				filePath="products/arbidol.webp"
				alt="Arbidol"
				width={150}
				height={150}
				preload
			/>
			<Image src={'/arbidol.webp'} alt="test" width={100} height={100} /> */}
			{/* <RequestOtpForm onOtpSent={(phone) => { console.log(phone) }} /> */}
			{/* <SignInForm /> */}
			<div className="border-2 bg-green-100 w-full p-5 rounded-4xl mb-5">
				<RequestOtpForm onOtpSent={handleOtpSent} />;
			</div>
			<div className="border-2 bg-blue-100 w-full p-5 rounded-4xl mb-5">
				{'903-123-45-67'}
				<VerifyOtpForm phoneNumber='+79031234567' />
			</div>
			<div className="border-2 bg-orange-100 w-full p-5 rounded-4xl mb-5">
				<SignInForm />
			</div>



		</div >
	);
}
