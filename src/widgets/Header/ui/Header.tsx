
import { getCities } from '@/entities/region/api/getCities';
import { getDefaultSelectedCity } from '@/entities/region/lib/getDefaultSelectedCity';
import { RegionButton } from '@/features/region/';
import { ButtonContact, Icon, Logo } from '@/shared/ui';
import { cookies } from 'next/headers'

export async function Header() {
	const cookieStore = await cookies();
	const selectedCityId = cookieStore.get('selectedCityId')?.value;

	// Загружаем все города (нужны для меню)
	const cities = await getCities()

	// Определяем город по-умолчанию
	const defaultCity = await getDefaultSelectedCity(cities)

	return (
		<header className="">
			{/* Верхний блок */}
			<div className="border-green-400 border bg-white">
				<div className="border-blue-400 border container mx-auto flex gap-5 py-2 items-center">
					{/* <div className='mr-15.5 font-accent'>
						<Icon name='nearMe' className='text-cust-mint' />
						<span className='text-cust-grayblue text-sm font-medium font-accent'>
							Москва и область
						</span>
						<Icon name='keyboardArrowDown' className='text-cust-gray' />
					</div> */}
					<RegionButton
						initialCities={cities}
						initialSelectedCity={defaultCity}
					/>
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
						<div className='w-7.25 h-7.25 border border-cust-butt-bd-inact text-center align-middle rounded-full'>
							<Icon name='vk' className='text-cust-mint' />
						</div>
						<div className='w-7.25 h-7.25 border border-cust-butt-bd-inact text-center align-middle rounded-full'>
							<Icon name='instagram' className='text-cust-mint' />
						</div>
						<div className='w-7.25 h-7.25 border border-cust-butt-bd-inact text-center align-middle rounded-full'>
							<Icon name='youtube' className='text-cust-mint' />
						</div>
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