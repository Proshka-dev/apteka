// features/region/ui/RegionMenu/RegionMenu.tsx
'use client';

import { City } from '@/entities/region';
import { cn, useClickOutside } from '@/shared/lib';
import { RefObject, useEffect, useRef } from 'react';

interface RegionMenuProps {
	cities: City[]
	selectedCity: City | null
	onSelect: (city: City) => void
	onClose: () => void
	buttonRef?: RefObject<HTMLButtonElement | null>; // реф на кнопку открытия
}

export const RegionMenu = ({ cities, selectedCity, onSelect, onClose, buttonRef }: RegionMenuProps) => {
	// Реф для Закрытия при клике вне
	const menuRef = useRef<HTMLDivElement>(null);
	// Используем хук с массивом рефов: сам меню и кнопка (если передана)
	useClickOutside([menuRef, buttonRef].filter(Boolean) as React.RefObject<HTMLElement>[], onClose);

	return (
		<div ref={menuRef} className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg p-2 z-50">
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