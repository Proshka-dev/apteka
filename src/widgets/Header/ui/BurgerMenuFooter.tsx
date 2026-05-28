import { Button, ButtonLink, Icon, Logo, SheetClose, } from "@/shared/ui";
import { ButtonTopNav } from "./ButtonTopNav";

export function BurgerMenuFooter() {
	return (
		<div className="container flex justify-around py-9">
			<SheetClose>

				<ButtonTopNav
					href='/favorites'
					iconName='favoriteBorder'
					iconPosition="left"
				>

					<span className="text-sm text-cust-gray font-medium">
						Избранное
					</span>
				</ButtonTopNav>
			</SheetClose>
			<SheetClose>
				<ButtonTopNav
					href='/profile'
					iconName='person'
					iconPosition="left"
				>
					<span className="text-sm text-cust-gray font-medium">
						Личный кабинет
					</span>
				</ButtonTopNav>
			</SheetClose>
		</div>
	)
}
