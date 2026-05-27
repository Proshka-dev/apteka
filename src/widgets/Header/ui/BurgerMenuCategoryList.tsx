'use client';
import { IconName } from "@/shared/ui";
import { Category } from "@/entities/category";
import { ButtonCategory } from "./ButtonCategory";

interface BurgerMenuCategoryListProps {
	categories: Category[];
}

interface DisplayCategory {
	id: string | number;
	name: string;
	href: string;
	iconName: IconName;
}

export function BurgerMenuCategoryList({ categories }: BurgerMenuCategoryListProps) {
	const MAX_VISIBLE_CATEGORIES = 8;
	const CATALOG_HREF = '/catalog';

	let displayItems: DisplayCategory[] = categories.map(cat => ({
		id: cat.id,
		name: cat.name,
		href: `/categories/${cat.slug}`,
		iconName: (cat.iconName as IconName) || 'pills',
	}));

	if (categories.length > MAX_VISIBLE_CATEGORIES) {
		displayItems = [
			...displayItems.slice(0, MAX_VISIBLE_CATEGORIES - 1),
			{
				id: 'all-catalog',
				name: 'весь каталог',
				href: CATALOG_HREF,
				iconName: 'menu',
			},
		];
	}

	return (
		<div className="bg-cust-blue">
			<ul className="grid grid-cols-2 auto-rows-min gap-px bg-white/5">
				{displayItems.map((item) => (
					<li key={item.id} className="h-12.5 flex items-center bg-cust-blue">
						<ButtonCategory
							href={item.href}
							iconName={item.iconName}
							className="px-5"
						>
							{item.name}
						</ButtonCategory>
					</li>
				))}
			</ul>
		</div>
	);
}