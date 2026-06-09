import { Button, Icon, StoreImage } from "@/shared/ui";
import Image from "next/image";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog"

export function HomePage() {
	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Главная страница
			<StoreImage
				filePath="products/arbidol.webp"
				alt="Arbidol"
				width={150}
				height={150}
			/>
			<Image src={'/arbidol.webp'} alt="test" width={100} height={100} />
		</div >
	);
}
