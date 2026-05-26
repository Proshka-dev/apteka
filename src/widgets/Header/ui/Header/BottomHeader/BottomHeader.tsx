import { getCategories } from "@/entities/category";
import { MenuCategory } from "./MenuCategory/MenuCategory";

export async function BottomHeader() {
	const categories = await getCategories();
	return (
		<div className="border-green-400 border bg-gradient-custom hidden md:flex">
			<div className="border-blue-400 border container mx-auto">
				<MenuCategory categories={categories} />
			</div>
		</div>
	);
};