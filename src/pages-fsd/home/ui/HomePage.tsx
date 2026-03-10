import { Button, Icon } from "@/shared/ui";
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
		</div >
	);
}
