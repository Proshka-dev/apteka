
import { TopHeader } from './TopHeader/TopHeader';
import { MiddleHeader } from './MiddleHeader/MiddleHeader';
import { BottomHeader } from './BottomHeader/BottomHeader';

export function Header() {
	return (
		<header className="">
			{/* Верхний блок */}
			<TopHeader />

			{/* Средний блок */}
			<MiddleHeader />

			{/* Нижний блок */}
			<BottomHeader />
		</header>
	);
};