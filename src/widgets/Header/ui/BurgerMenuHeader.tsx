import { Button, ButtonLink, Icon, Logo, SheetClose, } from "@/shared/ui";

export function BurgerMenuHeader() {
	return (
		<div className="py-7.5">
			<div className="container mx-auto flex gap-5 items-center justify-between">
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

	)
}
