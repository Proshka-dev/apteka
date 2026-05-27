import { Category, getCategories } from "@/entities/category";
import { MenuCategory } from "./MenuCategory";

interface BottomHeaderProps {
	categories: Category[];
}

export async function BottomHeader({ categories }: BottomHeaderProps) {
	return (
		<div className="border-green-400 border bg-gradient-custom hidden md:flex">
			<div className="border-blue-400 border container mx-auto">
				<MenuCategory categories={categories} />
			</div>
		</div>
	);
};