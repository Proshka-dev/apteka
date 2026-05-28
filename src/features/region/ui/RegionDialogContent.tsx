// features/region/ui/RegionDialogContent/RegionDialogContent.tsx
'use client';

import { useState } from 'react';
import { Icon, InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui';
import { ScrollArea } from '@/shared/ui';
import { City } from '@/entities/region';

interface RegionDialogContentProps {
	cities: City[];
	onSelect: (city: City) => void;
	onClose: () => void;
}

export const RegionDialogContent = ({ cities, onSelect, onClose }: RegionDialogContentProps) => {
	const [search, setSearch] = useState('');

	const filteredCities = cities.filter(city =>
		city.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleCityClick = (city: City) => {
		onSelect(city);
		onClose();
	};

	return (
		<div className="flex flex-col gap-7.5 w-full h-full">
			<InputGroup className="w-full shrink-0">
				<InputGroupInput
					placeholder="Найдите свой город"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full"
					autoFocus
				/>
				<InputGroupAddon className="pl-5">
					<Icon name="search" className="size-5 text-cust-placeholder-icon" />
				</InputGroupAddon>
			</InputGroup>
			<div className='min-h-0 flex-1'>
				<ScrollArea className="h-full -mr-2 pr-2">
					<div
						className={`
            grid gap-2
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
			xl:grid-cols-5
			2xl:grid-cols-5
          `}
					>
						{filteredCities.map((city) => (
							<button
								key={city.id}
								onClick={() => handleCityClick(city)}
								className="text-left px-2 py-1 hover:bg-accent rounded transition-colors wrap-break-word"
							>
								{city.name}
							</button>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};