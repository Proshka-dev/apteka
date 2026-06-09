'use client'

import Image, { ImageProps } from 'next/image';
import { forwardRef } from 'react';

type StoreImageProps = Omit<ImageProps, 'src' | 'loader'> & {
	filePath: string;
};

const customLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
	const filePath = src.split('?filePath=')[1];
	const params = new URLSearchParams({ filePath });
	params.set('w', width.toString());
	if (quality) params.set('q', quality.toString());
	return `/api/image?${params.toString()}`;
};

export const StoreImage = forwardRef<HTMLImageElement, StoreImageProps>(
	({ filePath, ...props }, ref) => {
		return (
			<Image
				ref={ref}
				loader={customLoader}
				src={`/api/image?filePath=${filePath}`}
				{...props}   // alt, width, height, fill и всё остальное пробрасывается сюда
			/>
		);
	}
);

StoreImage.displayName = 'StoreImage';