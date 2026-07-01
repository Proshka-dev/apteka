import { Badge, Button, StarRating } from '@/shared/ui';
import { StoreImage } from '@/shared/ui/StoreImage';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
	product: {
		id: number;
		name: string;
		slug: string;
		imagePath?: string | null;
		isProductOfDay?: boolean;
		inStock?: boolean;
		rating?: number;
		brand?: string | null;
		packageQuantity?: number | null;
		code?: string;
		price: number;
		oldPrice?: number | null;
	};
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="w-70 border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
			{/* Фотография 280x160 + бадж "Товар дня" */}
			<div className="relative w-full h-40">
				{product.imagePath ? (
					<StoreImage
						filePath={product.imagePath}
						alt={product.name}
						fill
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
						Нет фото
					</div>
				)}
				{product.isProductOfDay && (
					<Badge className="absolute top-2 left-2 bg-green-600 text-white rounded-full px-3 py-1 text-xs font-bold">
						Товар дня
					</Badge>
				)}
			</div>

			{/* Информация о товаре */}
			<div className="p-3 flex flex-col gap-2 flex-1">
				{/* Наличие и рейтинг */}
				<div className="flex justify-between items-center">
					<span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
						{product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
					</span>
					<StarRating rating={product.rating ?? 0} />
				</div>

				{/* Название товара */}
				<Link href={`/product/${product.slug}`} className="text-sm font-semibold leading-tight hover:underline line-clamp-2">
					{product.name}
				</Link>

				{/* Характеристики */}
				<ul className="space-y-1 text-xs text-gray-600">
					{product.brand && (
						<li className="flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block shrink-0" />
							Бренд: {product.brand}
						</li>
					)}
					{product.packageQuantity && (
						<li className="flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block shrink-0" />
							Количество в упаковке: {product.packageQuantity} шт
						</li>
					)}
					<li className="flex items-center gap-1.5">
						<span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block shrink-0" />
						Код товара: {product.code}
					</li>
				</ul>

				{/* Цена и кнопка корзины */}
				<div className="mt-auto flex justify-between items-center pt-2 border-t">
					<div>
						<p className="text-lg font-bold">{product.price.toLocaleString()} ₽</p>
						{product.oldPrice && (
							<p className="text-sm text-red-500 line-through">{product.oldPrice.toLocaleString()} ₽</p>
						)}
					</div>
					<Button variant="primary" size="icon-50" aria-label="Добавить в корзину">
						<ShoppingCartIcon className="size-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}