import { MenuCategory } from "./MenuCategory/MenuCategory";

export async function BottomHeader() {
	return (
		<div className="border-green-400 border bg-gradient-custom">
			<div className="border-blue-400 border container mx-auto">
				<MenuCategory />
			</div>
		</div>
	);
};