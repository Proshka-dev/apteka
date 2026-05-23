// shared/ui/ScrollArrows/ScrollArrows.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';

interface ScrollArrowsProps {
	/** Ссылка на контейнер, который скроллится */
	scrollContainerRef: React.RefObject<HTMLElement>;
	/** Левая стрелка (React‑нода) */
	leftArrow?: React.ReactNode;
	/** Правая стрелка (React‑нода) */
	rightArrow?: React.ReactNode;
	/** Цвет градиента фона (tailwind‑класс, например 'from-white') */
	gradientFrom?: string;
	className?: string;
}

export function ScrollArrows({
	scrollContainerRef,
	leftArrow = <DefaultChevronLeft />,
	rightArrow = <DefaultChevronRight />,
	gradientFrom = 'from-white',
	className = '',
}: ScrollArrowsProps) {
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const checkScroll = useCallback(() => {
		const el = scrollContainerRef.current;
		if (!el) return;
		// Допуск в 1px, чтобы не дёргалось на границах
		setCanScrollLeft(el.scrollLeft > 1);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, [scrollContainerRef]);

	useEffect(() => {
		const el = scrollContainerRef.current;
		if (!el) return;

		// Проверить сразу
		checkScroll();

		// Следим за скроллом
		el.addEventListener('scroll', checkScroll, { passive: true });

		// Следим за изменением размера контейнера и его содержимого
		const observer = new ResizeObserver(checkScroll);
		observer.observe(el);

		// Наблюдаем также за изменениями дочерних элементов (если список динамический)
		// Это опционально: можно добавить MutationObserver, но ResizeObserver на el уже реагирует на изменение scrollWidth

		return () => {
			el.removeEventListener('scroll', checkScroll);
			observer.disconnect();
		};
	}, [checkScroll, scrollContainerRef]);

	return (
		<>
			{canScrollLeft && (
				<div
					className={`absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r ${gradientFrom} to-transparent pl-2 pr-4 pointer-events-none ${className}`}
				>
					{leftArrow}
				</div>
			)}
			{canScrollRight && (
				<div
					className={`absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l ${gradientFrom} to-transparent pr-2 pl-4 pointer-events-none ${className}`}
				>
					{rightArrow}
				</div>
			)}
		</>
	);
}

// Дефолтные иконки
function DefaultChevronLeft() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500">
			<path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
function DefaultChevronRight() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500">
			<path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}