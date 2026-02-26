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

				<Button variant={"pillPrimary50"}>pillPrimary50</Button>
				<Button variant={"pillPrimary50ShGreen"}>pillPrimary50ShGreen</Button>
				<Button variant={"pillPrimary40ShGreen"}>pillPrimary40ShGreen</Button>
				<Button variant={"pillPrimary46ShGrey"}>pillPrimary46ShGrey</Button>
				<Button variant={"rectPrimary33"}>rectPrimary33</Button>
				<Button variant={"rectSecondary33"}>rectSecondary33</Button>
				<Button variant={"rectWhite30"}>rectWhite30</Button>
				<Button variant={"pillOutline50"}>pillOutline50</Button>
				<Button variant={"pillOutline40"}>pillOutline40</Button>
				<Button variant={"pillOutline36"}>pillOutline36</Button>
				<Button variant={"square40"}>square40</Button>
				<Button variant={"square27"}>square27</Button>
				<Button variant={"pillSecondary30lg"}>pillSecondary30lg</Button>
				<Button variant={"pillSecondary30"}>pillSecondary30</Button>
				<Button variant={"pillSecondary25"}>pillSecondary25</Button>
				<Button variant={"fullWidthPrimary40"}>
					<span>{'>>'}</span>
					<span>{'fullWidthPrimary40'}</span>
				</Button>
				<Button variant={"fullWidthPrimary50RadBottom"}>fullWidthPrimary50RadBottom</Button>
				<Button variant={"fullWidthLink40"}>
					<span>{'>>'}</span>
					<span>{'fullWidthLink40'}</span>
				</Button>
				<Button variant={"fullWidthPrimary36Card"}>
					<span>{'fullWidthPrimary36Card'}</span>
					<span>{'<<'}</span>
				</Button>
				<Button variant={"fullWidthPrimary50RadAll"}>
					<span>{'>>'}</span>
					<span>{'fullWidthPrimary50RadAll'}</span>
				</Button>

				iconOutline50
				<Button variant={"iconOutline50"}>
					<Icon name="search" className="w-6 h-6"></Icon>
				</Button>

				iconOutline40
				<Button variant={"iconOutline40"}>
					<Icon name="menu" className="w-6 h-6"></Icon>
				</Button>
				iconOutline40bw
				<Button variant={"iconOutline40bw"}>
					<Icon name="keyboardArrowDown" className="w-5 h-5 rotate-90"></Icon>
				</Button>
				iconOutline29
				<Button variant={"iconOutline29"}>
					<Icon name="vk" className="w-3.25 h-2.25"></Icon>
				</Button>
				iconPrimary50
				<Button variant={"iconPrimary50"}>
					<Icon name="shoppingCart" className="w-5 h-5"></Icon>
				</Button>

				iconPrimary46
				<Button variant={"iconPrimary46"}>
					<Icon name="shoppingCart" className="w-5 h-5"></Icon>
				</Button>

				iconPrimary25
				<Button variant={"iconPrimary25"}>
					<Icon name="vk" className="w-3.25 h-2.25"></Icon>
				</Button>

			</div>
		</div >
	);
}
