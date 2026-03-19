'use client'

import { useMediaQuery } from "@/shared/lib";
import { Button, Icon, Input, Label, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import { useEffect, useState } from "react";

export function BurgerMenu() {

	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)'); // md брейкпоинт

	useEffect(() => {
		if (isDesktop) {
			setOpen(false);
		}
	}, [isDesktop]);

	return (
		<div className='flex md:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger
					render={
						<Button
							variant={'icon-outline'}
							size={'icon-50'}
							className={''}
						>
							<Icon name='menu' className='size-6 text-cust-mint' />
						</Button>
					}
				/>
				<SheetContent
					side="top"
					// className={'!top-28'} // w-screen min-h-200
					className={'md:hidden'}
					showCloseButton={false}
					overlayClassName="md:backdrop-filter-none! md:bg-transparent!"
				>
					<div className="grid flex-1 auto-rows-min gap-6 px-4">
						<div className="grid gap-3">
							<Label htmlFor="sheet-demo-name">Name</Label>
							<Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="sheet-demo-username">Username</Label>
							<Input id="sheet-demo-username" defaultValue="@peduarte" />
						</div>
					</div>
					<SheetFooter>
						<Button type="submit">Save changes</Button>
						<SheetClose render={<Button variant="primary-outline">Close</Button>} />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}


// overlayClassName="backdrop-filter-none! bg-transparent!"
