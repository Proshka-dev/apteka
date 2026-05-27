
import { getCities } from '@/entities/region/api/getCities';
import { getDefaultSelectedCity } from '@/entities/region/lib/getDefaultSelectedCity';
import { RegionButton } from '@/features/region/';
import { ButtonContact } from '@/shared/ui';
import { cookies } from 'next/headers'
import { ButtonTopNav } from './ButtonTopNav';

export async function TopHeader() {
	const cookieStore = await cookies();
	//const selectedCityId = cookieStore.get('selectedCityId')?.value;

	// Загружаем все города (нужны для меню)
	const cities = await getCities()

	// Определяем город по-умолчанию
	const defaultCity = await getDefaultSelectedCity(cities)

	return (
		<div className="border-green-400 border bg-white ">
			<div className="border-blue-400 border container mx-auto flex py-2 justify-between items-center">
				{/* Левый блок кнопок*/}
				<div className='flex gap-5'>
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

				{/* Центральный блок кнопок*/}
				<div className='hidden flex-1 justify-evenly xl:flex'>
					<ButtonContact
						type="email"
						value="info@restoll.ru"
						subtitle="Напишите нам"
						iconName='messageOpen'
					/>
					<ButtonContact
						type="phone"
						value="8-800-777-22-33"
						subtitle="Круглосуточно"
						iconName='phone'
					/>
					<ButtonContact
						type="phone"
						value="8 (495) 223-34-03"
						subtitle="Интернет-аптека"
						iconName='phone'
					/>
				</div>

				{/* Правый блок кнопок*/}
				<div className='flex gap-5'>
					<ButtonTopNav href='/favorites' iconName='favoriteBorder' className='hidden md:inline-flex'>
						Избранное
					</ButtonTopNav>
					<ButtonTopNav href='/profile' iconName='person'>
						Личный кабинет
					</ButtonTopNav>

				</div>
			</div>
		</div>
	);
};