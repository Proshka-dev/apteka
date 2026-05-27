'use client'

import { Category } from "@/entities/category";
import { useMediaQuery } from "@/shared/lib";
import { Button, ButtonLink, Icon, IconName, Input, Label, Logo, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import { useEffect, useState } from "react";
import { BurgerMenuCategoryList } from "./BurgerMenuCategoryList";

interface BurgerMenuProps {
	categories: Category[];
}


export function BurgerMenu({ categories }: BurgerMenuProps) {


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
							size={isDesktop ? 'icon-50' : 'icon-40'}
							className={''}
						>
							<Icon name='menu' className='size-6 text-cust-mint' />
						</Button>
					}
				/>
				<SheetContent
					side="top"
					// className={'!top-28'} // w-screen min-h-200
					className={'md:hidden p-5'}
					showCloseButton={false}
					overlayClassName="md:backdrop-filter-none! md:bg-transparent!"
				>
					{/* Header */}
					<div>
						<div className="border-blue-400 border container mx-auto flex gap-5 items-center justify-between">
							<SheetClose render={
								<Button variant={'icon-outline'} size={'icon-40'}>
									<Icon name='closeBig' className='size-3.5 text-cust-mint' />
								</Button>
							} />


							<div className='mr-2.5'>
								<Logo />
							</div>

							<ButtonLink href='/cart' variant={'icon-outline'} size={'icon-40'}>
								<Icon name='shoppingCart' className='size-5 text-cust-mint' />
							</ButtonLink>
						</div>

					</div>

					{/* Body */}
					<BurgerMenuCategoryList categories={categories} />
					{/* Footer */}
					<div className="flex flex-col">
						Footer
						<Button type="submit">Save changes</Button>
						<SheetClose render={<Button variant="primary-outline">Close</Button>} />
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}


// overlayClassName="backdrop-filter-none! bg-transparent!"
