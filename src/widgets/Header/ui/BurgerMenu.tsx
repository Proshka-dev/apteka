'use client'

import { Category } from "@/entities/category";
import { useMediaQuery } from "@/shared/lib";
import { Button, Icon, Sheet, SheetContent, SheetTrigger } from "@/shared/ui";
import { useEffect, useState } from "react";
import { BurgerMenuCategoryList } from "./BurgerMenuCategoryList";
import { BurgerMenuHeader } from "./BurgerMenuHeader";
import { BurgerMenuSearch } from "./BurgerMenuSearch";
import { BurgerMenuFooter } from "./BurgerMenuFooter";

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
					className={'md:hidden p-0 gap-0'}

					showCloseButton={false}
					overlayClassName="md:backdrop-filter-none! md:bg-transparent!"
				>
					{/* Header */}
					<BurgerMenuHeader />

					{/* Body */}
					<BurgerMenuSearch />

					<BurgerMenuCategoryList categories={categories} />
					{/* Footer */}
					<BurgerMenuFooter />
				</SheetContent>
			</Sheet>
		</div>
	)
}


// overlayClassName="backdrop-filter-none! bg-transparent!"
