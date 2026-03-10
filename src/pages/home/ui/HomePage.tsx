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

				{/* Пилюли */}
				<Button variant="primary" size="pill-50-bold-accent">pillPrimary50</Button>
				<Button variant="primary-green-shadow" size="pill-50-bold-accent">pillPrimary50ShGreen</Button>
				<Button variant="primary-green-shadow" size="pill-40-bold-accent">pillPrimary40ShGreen</Button>
				<Button variant="primary-grey-shadow" size="pill-46-bold-accent">pillPrimary46ShGrey</Button>

				{/* Прямоугольные */}
				<Button variant="primary" size="rect-33-bold-sans">rectPrimary33</Button>
				<Button variant="grey" size="rect-33-sans">rectSecondary33</Button>
				<Button variant="white" size="rect-30-accent">rectWhite30</Button>

				{/* Outline пилюли */}
				<Button variant="primary-outline" size="pill-50-bold-accent">pillOutline50</Button>
				<Button variant="primary-outline" size="pill-40-sans">pillOutline40</Button>
				<Button variant="primary-outline" size="pill-36-sans">pillOutline36</Button>

				{/* Квадратные */}
				<Button variant="white" size="square-40-sans">square40</Button>
				<Button variant="white" size="square-27-sans">square27</Button>

				{/* Вторичные пилюли */}
				<Button variant="grey" size="pill-30-sans">pillSecondary30lg</Button>
				<Button variant="grey" size="pill-30-sans-medium">pillSecondary30</Button>
				<Button variant="grey" size="pill-25-sans">pillSecondary25</Button>

				{/* FullWidth */}
				<Button variant="primary-black-shadow" size="full-40-primary-shadow">
					<span>{'>>'}</span>
					<span>fullWidthPrimary40</span>
				</Button>

				<Button variant="primary" size="full-50-bottom-sans">fullWidthPrimary50RadBottom</Button>

				<Button variant="text-link" size="full-40-link">
					<span>{'>>'}</span>
					<span>fullWidthLink40</span>
				</Button>

				<Button variant="primary" size="full-36-card-accent">
					<span>fullWidthPrimary36Card</span>
					<span>{'<<'}</span>
				</Button>

				<Button variant="primary" size="full-50-all-sans-bold">
					<span>{'>>'}</span>
					<span>fullWidthPrimary50RadAll</span>
				</Button>

				{/* Иконки */}
				{/* iconOutline50 */}
				<Button variant="icon-outline" size="icon-50">
					<Icon name="search" className="w-6 h-6" />
				</Button>

				{/* iconOutline40 */}
				<Button variant="icon-outline" size="icon-40">
					<Icon name="menu" className="w-6 h-6" />
				</Button>

				{/* iconOutline40bw */}
				<Button variant="icon-outline-bw" size="icon-40">
					<Icon name="keyboardArrowDown" className="w-5 h-5 rotate-90" />
				</Button>

				{/* iconOutline29 */}
				<Button variant="icon-outline" size="icon-29">
					<Icon name="vk" className="w-3.25 h-2.25" />
				</Button>

				{/* iconPrimary50 */}
				<Button variant="icon-primary" size="icon-50">
					<Icon name="shoppingCart" className="w-5 h-5" />
				</Button>

				{/* iconPrimary46 */}
				<Button variant="icon-primary" size="icon-46">
					<Icon name="shoppingCart" className="w-5 h-5" />
				</Button>

				{/* iconPrimary25 */}
				<Button variant="icon-primary" size="icon-25">
					<Icon name="vk" className="w-3.25 h-2.25" />
				</Button>
			</div>
		</div >
	);
}
