import { CategoryPage } from "@/pages-fsd/category";

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<CategoryPage slug={slug} />
	);
}
