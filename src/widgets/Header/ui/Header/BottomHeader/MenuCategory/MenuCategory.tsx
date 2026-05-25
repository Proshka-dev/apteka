'use client';
import { IconName } from "@/shared/ui";
import { ButtonCategory } from "../ButtonCategory/ButtonCategory";
import { useDragScroll } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";

interface CategoryMenuItem {
	text: string;
	iconName: IconName;
	href: string;
}

export function MenuCategory() {
	const { ref, canScrollLeft, canScrollRight } = useDragScroll<HTMLUListElement>({
		speed: 1.0,
	});

	// Формируем маску динамически
	const maskStyle: React.CSSProperties = {
		maskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent 0%, black 5%' : 'black 0%'
			}, ${canScrollRight ? 'black 95%, transparent 100%' : 'black 100%'
			})`,
		WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent 0%, black 5%' : 'black 0%'
			}, ${canScrollRight ? 'black 95%, transparent 100%' : 'black 100%'
			})`,
	};

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
		<div className="relative flex overflow-hidden items-center grow">
			<div className="max-w-full w-full">
				<ul
					ref={ref}
					style={maskStyle}
					className="flex gap-2.5 max-w-full select-none overflow-x-scroll whitespace-nowrap cursor-grab hide-scrollbar"
				>
					{categories.map((item) => (
						<li key={item.text} className="flex space-x-4 p-2">
							<span draggable={false} onDragStart={(e) => e.preventDefault()}>
								<ButtonCategory href={item.href} iconName={item.iconName}>
									{item.text}
								</ButtonCategory>
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}