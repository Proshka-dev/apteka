'use client'
import { Button, Icon, Input, Label, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";

export function BurgerMenu() {
	//Обработчик открытия бокового меню
	// function handleBurgerMenuOpen() {
	// 	alert('menu test');
	// }

	return (
		<div className='flex md:hidden'>
			<Sheet>
				<SheetTrigger
					render={
						<Button
							variant={'icon-outline'}
							size={'icon-50'}
							className={''}
						// onClick={handleBurgerMenuOpen}
						>
							<Icon name='menu' className='size-6 text-cust-mint' />
						</Button>
					}
				/>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you&apos;re done.
						</SheetDescription>
					</SheetHeader>
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
