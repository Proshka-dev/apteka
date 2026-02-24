// features/region/ui/RegionMenu/RegionMenu.tsx
'use client';

import { City } from '@/entities/region';
import { cn } from '@/shared/lib';

interface RegionMenuProps {
	cities: City[]
	selectedCity: City | null
	onSelect: (city: City) => void
	onClose: () => void
}

export const RegionMenu = ({ cities, selectedCity, onSelect, onClose }: RegionMenuProps) => {
	// Закрытие при клике вне (можно использовать хук useClickOutside)
	return (
		<div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg p-2 z-50">
			{cities.map(city => (
				<button
					key={city.id}
					className={cn(
						'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100',
						selectedCity?.id === city.id && 'font-bold bg-gray-50'
					)}
					onClick={() => onSelect(city)}
				>
					{city.name}
				</button>
			))}
		</div>
	);
};