
import { getCities } from '@/entities/region/api/getCities';
import { getDefaultSelectedCity } from '@/entities/region/lib/getDefaultSelectedCity';
import { RegionButton } from '@/features/region/';
import { ButtonContact, Icon, Logo } from '@/shared/ui';
import { cookies } from 'next/headers'
import { ButtonTopNav } from './ButtonTopNav';
import { ButtonSocials } from './ButtonSocials';

export async function Header() {
	const cookieStore = await cookies();
	//const selectedCityId = cookieStore.get('selectedCityId')?.value;

	// Загружаем все города (нужны для меню)
	const cities = await getCities()

	// Определяем город по-умолчанию
	const defaultCity = await getDefaultSelectedCity(cities)

	return (
		<header className="">
			{/* Верхний блок */}
			<div className="border-green-400 border bg-white">
				<div className="border-blue-400 border container mx-auto flex py-2 justify-between">
					<div className='flex gap-5'> {/* Левый блок кнопок*/}
						<RegionButton
							initialCities={cities}
							initialSelectedCity={defaultCity}
						/>
						{/* (!!!) Отложил разработку служебных страниц. Возможно, они не нужны.*/}
						{/* <div className='flex-1'>
							<Icon name='menu' className='text-cust-mint mr-2.5' />
							<span className='text-cust-grayblue text-sm font-medium font-accent'>
								Служебные страницы
							</span>
						</div> */}
					</div>
					<div className='flex gap-5'> {/* Правый блок кнопок*/}
						<ButtonTopNav href='/favorites' iconName='favoriteBorder' className='hidden md:inline-flex'>
							Избранное
						</ButtonTopNav>
						<ButtonTopNav href='/profile' iconName='person'>
							Личный кабинет
						</ButtonTopNav>

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
						<ButtonSocials href='https://vk.com' iconName='vk' />
						<ButtonSocials href='https://www.instagram.com' iconName='instagram' iconSize={3} />
						<ButtonSocials href='https://youtube.com' iconName='youtube' />
					</div>
					<div className='flex flex-1 justify-evenly'>
						<ButtonContact
							type="email"
							value="info@restoll.ru"
							subtitle="Напишите нам"
							icon={<Icon name='messageOpen' className="w-6 h-6 text-cust-mint" />}
						/>
						<ButtonContact
							type="phone"
							value="8-800-777-22-33"
							subtitle="Круглосуточно"
							icon={<Icon name='phone' className="w-6 h-6 text-cust-mint" />}
						/>
						<ButtonContact
							type="phone"
							value="8 (495) 223-34-03"
							subtitle="Интернет-аптека"
							icon={<Icon name='phone' className="w-6 h-6 text-cust-mint" />}
						/>
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