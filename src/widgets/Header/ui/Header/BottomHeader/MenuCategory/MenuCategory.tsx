'use client'

import { IconName } from "@/shared/ui";
import { ButtonCategory } from "../ButtonCategory/ButtonCategory";
import { useDragScroll } from "@/shared/lib";

interface CategoryMenuItem {
	text: string;
	iconName: IconName;
	href: string;
}

export function MenuCategory() {

	const { ref } = useDragScroll<HTMLUListElement>({
		speed: 1.0,
	});

	const categories: CategoryMenuItem[] = [
		{ text: 'лекарства', iconName: 'pills', href: '/categories/pills' },
		{ text: 'витамины и бад', iconName: 'vitamins', href: '/categories/vitamins' },
		{ text: 'красота', iconName: 'skinCare', href: '/categories/skinCare' },
		{ text: 'гигиена', iconName: 'washingHands', href: '/categories/washingHands' },
		{ text: 'линзы', iconName: 'eyeIcon', href: '/categories/eyeIcon' },
		{ text: 'мать и дитя', iconName: 'babyBoy', href: '/categories/babyBoy' },
		{ text: 'медтовары', iconName: 'firstAidKit', href: '/categories/firstAidKit' },
		{ text: 'зоотовары', iconName: 'dogIcon', href: '/categories/dogIcon' },
		{ text: 'медтехника', iconName: 'smartwatch', href: '/categories/smartwatch' },
	];


	return (
		<div className="flex overflow-hidden items-center grow">
			<div className="max-w-full">
				<ul
					className="flex gap-2.5 max-w-full select-none overflow-hidden overflow-x-scroll whitespace-nowrap cursor-grab touch-pan-y hide-scrollbar"
					// [&::-webkit-scrollbar]:hidden [scrollbar-width:none]
					ref={ref}
				>
					{categories.map((item) => (
						<li className="flex space-x-4 p-2" key={item.text}>
							{/*Для перехватывания события onDragStart и отмены действия по-умолчанию*/}
							<span
								draggable={false}
								onDragStart={(e) => e.preventDefault()}
							>
								<ButtonCategory
									href={item.href}
									iconName={item.iconName}
								>
									{item.text}
								</ButtonCategory>
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
