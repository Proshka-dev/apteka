'use client'
import { ButtonLink, Icon, Logo } from '@/shared/ui';
import { ButtonSocials } from '../../ButtonSocials';
import { SearchBar } from '../../../../../features/search/ui/SearchBar/SearchBar';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { useMediaQuery } from '@/shared/lib';

export function MiddleHeader() {

	const isDesktop = useMediaQuery('(min-width: 768px)'); // md брейкпоинт

	return (
		<div className="border-green-400 border bg-white shadow-black-10">
			<div className="border-blue-400 border container mx-auto flex gap-5 items-center justify-between">
				<BurgerMenu />


				<div className='mr-2.5'>
					<Logo />
				</div>

				<div className='hidden xl:flex gap-1.5'>
					<ButtonSocials href='https://vk.com' iconName='vk' />
					<ButtonSocials href='https://www.instagram.com' iconName='instagram' iconSize={3} />
					<ButtonSocials href='https://youtube.com' iconName='youtube' />
				</div>
				<div className='hidden md:block flex-1'>
					<SearchBar />
				</div>
				<ButtonLink href='/callback' variant={'primary'} size={'pill-50-bold-accent'} className={'hidden lg:flex min-w-57'}>
					Заказать звонок
				</ButtonLink>
				<ButtonLink href='/cart' variant={'icon-outline'} size={isDesktop ? 'icon-50' : 'icon-40'}>
					<Icon name='shoppingCart' className='size-6 text-cust-mint' />
				</ButtonLink>
			</div>
		</div>
	);
};