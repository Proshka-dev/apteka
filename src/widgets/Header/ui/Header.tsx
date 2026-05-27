
import { TopHeader } from './TopHeader';
import { MiddleHeader } from './MiddleHeader';
import { BottomHeader } from './BottomHeader';
import { getCategories } from '@/entities/category';

export async function Header() {
	const categories = await getCategories();

	return (
		<header className="">
			{/* Верхний блок */}
			<TopHeader />

			{/* Средний блок */}
			<MiddleHeader categories={categories} />

			{/* Нижний блок */}
			<BottomHeader categories={categories} />
		</header>
	);
};