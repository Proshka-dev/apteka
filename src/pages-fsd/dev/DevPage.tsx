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
import { DevButtons } from "@/widgets/DevButtons/DevButtons";

export function DevPage() {
	return (
		<div className="font-accent flex min-h-screen items-center justify-center flex-col" >
			Страница для разработчика
			<div className="flex flex-col gap-10">
				<Dialog>
					<DialogTrigger>Open</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your account
								and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>

				<DevButtons />
			</div>
		</div >
	);
}
