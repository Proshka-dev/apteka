// src/widgets/Header/ui/Header.tsx
'use client';

import { Button, Icon, Logo } from '@/shared/ui';

export const Header = () => {
	return (
		<header className="">
			{/* Верхний блок */}
			<div className="border-green-400 border bg-white">
				<div className="border-blue-400 border container mx-auto flex gap-5 py-2 items-center">
					<div className='mr-15.5 font-accent'>
						<Icon name='nearMe' className='text-cust-mint' />
						<span className='text-cust-grayblue text-sm font-medium font-accent'>
							Москва и область
						</span>
						<Icon name='keyboardArrowDown' className='text-cust-gray' />
					</div>
					<div className='flex-1'>
						<Icon name='favoriteBorder' className='text-cust-mint mr-2.5' />
						<span className='text-cust-grayblue text-sm font-medium font-accent'>
							Служебные страницы
						</span>
					</div>
					<div>
						<span className='text-cust-grayblue text-sm font-medium font-accent mr-2.5'>
							Избранное
						</span>
						<Icon name='menu' className='text-cust-mint' />
					</div>
					<div>
						<span className='text-cust-grayblue text-sm font-medium font-accent mr-2.5'>
							Личный кабинет
						</span>
						<Icon name='person' className='text-cust-mint' />
					</div>
				</div>
			</div>
			{/* Средний блок */}
			<div className="border-green-400 border bg-white shadow-black-10">
				<div className="border-blue-400 border container mx-auto flex gap-5 items-center">
					<div className='mr-2.5'>
						<Logo />
					</div>

					<div className='flex gap-1.5'>
						<div>vk</div>
						<div>inst</div>
						<div>yt</div>
					</div>
					<div className='flex flex-1 justify-evenly'>
						<div>почта</div>
						<div>телефон 1</div>
						<div>телефон 2</div>
					</div>
					<div>лупа</div>
					<div>Заказать звонок</div>
					<div>Корзина</div>
				</div>
			</div>
			{/* Меню */}
			<div className="border-green-400 border bg-gradient-custom">
				<div className="border-blue-400 border container mx-auto">3</div>
			</div>
		</header>
	);
};