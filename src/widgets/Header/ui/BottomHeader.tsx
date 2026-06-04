import { Category, getCategories } from "@/entities/category";
import { MenuCategory } from "./MenuCategory";
import { CallbackDialog } from "@/features/request-callback";

interface BottomHeaderProps {
	categories: Category[];
}

export async function BottomHeader({ categories }: BottomHeaderProps) {
	return (
		<div>
			{/* Десктопная версия */}
			<div className="bg-gradient-custom hidden md:flex">
				<div className="container mx-auto">
					<MenuCategory categories={categories} />
				</div>
			</div>
			{/* Мобильная версия */}
			<div className="md:hidden">
				<CallbackDialog />
			</div>
		</div>
	);
};