export interface Category {
	id: number
	name: string
	slug: string
	iconName: string | null
	order: number
	parentId: number | null
}