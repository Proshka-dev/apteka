'use client';
import { IconName } from "@/shared/ui";
import { ButtonCategory } from "../ButtonCategory/ButtonCategory";
import { useDragScroll } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Category } from "@/entities/category";

interface MenuCategoryProps {
	categories: Category[];
}

export function MenuCategory({ categories }: MenuCategoryProps) {
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

	return (
		<div className="relative flex overflow-hidden items-center grow">
			<div className="max-w-full w-full">
				<ul
					ref={ref}
					style={maskStyle}
					className="flex gap-2.5 max-w-full select-none overflow-x-scroll whitespace-nowrap cursor-grab hide-scrollbar"
				>
					{categories.map((item) => (
						<li key={item.id} className="flex space-x-4 p-2">
							<span draggable={false} onDragStart={(e) => e.preventDefault()}>
								<ButtonCategory
									href={`/categories/${item.slug}`}
									iconName={item.iconName as IconName}
								>
									{item.name}
								</ButtonCategory>
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}