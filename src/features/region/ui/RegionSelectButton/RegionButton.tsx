// features/region/ui/RegionButton/RegionButton.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui'
import { RegionMenu } from '../RegionMenu/RegionMenu'
import { City } from '@/entities/region/types'
import { useRegionStore } from '@/entities/region/model/store'

interface RegionButtonProps {
	initialCities: City[]
}

export const RegionButton = ({ initialCities }: RegionButtonProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { selectedCity, setSelectedCity } = useRegionStore()

	// Устанавливаем первый город по умолчанию при первом рендере
	useEffect(() => {
		if (!selectedCity && initialCities.length > 0) {
			setSelectedCity(initialCities[0])
		}
	}, [initialCities, selectedCity, setSelectedCity])

	return (
		<div className="relative">
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant="ghost"
				className="mr-15.5 flex items-center gap-1 font-accent"
			>
				<Icon name="nearMe" className="text-cust-mint" />
				<span className="text-cust-grayblue text-sm font-medium">
					{selectedCity?.name ?? 'Выберите город'}
				</span>
				<Icon
					name="keyboardArrowDown"
					className={`text-cust-gray transition-transform ${isOpen ? 'rotate-180' : ''
						}`}
				/>
			</Button>
			{isOpen && (
				<RegionMenu
					cities={initialCities} // используем города, полученные с сервера
					selectedCity={selectedCity}
					onSelect={(city) => {
						setSelectedCity(city)
						setIsOpen(false)
					}}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	)
}