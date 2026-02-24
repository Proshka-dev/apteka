// features/region/ui/RegionButton/RegionButton.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui'
import { RegionMenu } from '../RegionMenu/RegionMenu'
import { City } from '@/entities/region/types'
import { useRegionStore } from '@/entities/region/model/store'

interface RegionButtonProps {
	initialCities: City[]
	initialSelectedCity: City | null
}

export const RegionButton = ({ initialCities, initialSelectedCity }: RegionButtonProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { selectedCity, setSelectedCity } = useRegionStore()

	// Отображаемый город: приоритет у стора, иначе начальный из пропсов
	const displayCity = selectedCity ?? initialSelectedCity

	// Синхронизация стора с начальным городом при первой загрузке
	useEffect(() => {
		if (!selectedCity && initialSelectedCity) {
			setSelectedCity(initialSelectedCity)
		}
	}, [selectedCity, initialSelectedCity, setSelectedCity])

	// Обработчик выбора города
	const handleSelect = async (city: City) => {
		setSelectedCity(city)       // обновляем стор
		setIsOpen(false)             // закрываем меню

		// Отправляем запрос на сервер для сохранения выбора в куки
		try {
			await fetch('/api/select-city', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ cityId: city.id }),
			})
		} catch (error) {
			console.error('Ошибка при сохранении города в куки:', error)
		}
	}

	if (!initialCities.length) {
		return <div>Нет доступных городов</div>
	}

	return (
		<div className="relative">
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant="ghost"
				className="mr-15.5 flex items-center gap-1 font-accent"
			>
				<Icon name="nearMe" className="text-cust-mint" />
				<span className="text-cust-grayblue text-sm font-medium">
					{displayCity?.name ?? 'Выберите город'}
				</span>
				<Icon
					name="keyboardArrowDown"
					className={`text-cust-gray transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</Button>
			{isOpen && (
				<RegionMenu
					cities={initialCities}
					selectedCity={displayCity}
					onSelect={handleSelect}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	)
}