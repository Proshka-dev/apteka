// features/region/ui/RegionDialog/RegionDialogContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui';
import { ScrollArea } from '@/shared/ui';
import { City } from '@/entities/region';
import { cn } from '@/shared/lib';

interface RegionDialogContentProps {
	cities: City[];
	onSelect: (city: City) => void;
	onClose: () => void;
}

export const RegionDialogContent = ({ cities, onSelect, onClose }: RegionDialogContentProps) => {
	const [search, setSearch] = useState('');
	const [columnCount, setColumnCount] = useState(5); // по умолчанию десктоп

	// Определяем количество колонок в зависимости от ширины окна
	useEffect(() => {
		const updateColumnCount = () => {
			if (window.innerWidth < 768) {
				setColumnCount(2);
			} else {
				setColumnCount(5);
			}
		};
		updateColumnCount();
		window.addEventListener('resize', updateColumnCount);
		return () => window.removeEventListener('resize', updateColumnCount);
	}, []);

	const filteredCities = cities.filter(city =>
		city.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleCityClick = (city: City) => {
		onSelect(city);
		onClose();
	};

	return (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="Найдите свой город"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full"
				autoFocus
			/>
			<ScrollArea className="h-[320px] -mr-2 pr-2">
				<div
					className={cn(
						'grid gap-2',
						columnCount === 5 ? 'grid-cols-5' : 'grid-cols-2'
					)}
				>
					{filteredCities.map((city) => (
						<button
							key={city.id}
							onClick={() => handleCityClick(city)}
							className="text-left px-2 py-1 hover:bg-accent rounded transition-colors"
						>
							{city.name}
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};