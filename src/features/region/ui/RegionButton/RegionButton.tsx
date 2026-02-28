// features/region/ui/RegionButton/RegionButton.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui'
import { RegionDialog } from '../RegionDialog/RegionDialog'
import { City } from '@/entities/region'
import { useRegionStore } from '@/entities/region'

interface RegionButtonProps {
	initialCities: City[]
	initialSelectedCity: City | null
}

export const RegionButton = ({ initialCities, initialSelectedCity }: RegionButtonProps) => {
	const [dialogOpen, setDialogOpen] = useState(false)

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
		setDialogOpen(false)

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
				onClick={() => setDialogOpen(true)}

				variant="ghost"
				className="mr-15.5 flex items-center gap-1 font-accent"
			>
				<Icon name="nearMe" className="text-cust-mint" />
				<span className="text-cust-grayblue text-sm font-medium">
					{displayCity?.name ?? 'Выберите город'}
				</span>
				<Icon
					name="keyboardArrowDown"
					className={`text-cust-gray transition-transform ${dialogOpen ? 'rotate-180' : ''}`}
				/>
			</Button>
			{dialogOpen && (
				<RegionDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					cities={initialCities}
					onSelect={handleSelect}
				/>
			)}
		</div>
	)
}