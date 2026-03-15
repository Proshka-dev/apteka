import { Button, Icon, ScrollArea } from "@/shared/ui";
import Image from "next/image";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog"
import { DevButtons } from "@/widgets/DevButtons/DevButtons";
import { DevDialogs } from "@/widgets/DevDialogs/DevDialogs";

export function DevPage() {
	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Страница для разработчика
			<div className="flex flex-col gap-10">
				<DevDialogs />
				<DevButtons />
				<div className="h-50 border-amber-700 border">
					<ScrollArea className="h-full">
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
						<div>Текст</div>
					</ScrollArea>
				</div>

			</div>
		</div >
	);
}
