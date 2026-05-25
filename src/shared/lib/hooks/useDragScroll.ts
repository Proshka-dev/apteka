// shared/lib/useDragScroll.ts
'use client';
import { useRef, useState, useEffect, useCallback } from 'react';

interface Options {
	speed?: number;
	dragThreshold?: number;
}

export function useDragScroll<T extends HTMLElement>(options: Options = {}) {
	const { speed = 1.5, dragThreshold = 3 } = options;
	const ref = useRef<T>(null);
	const dragging = useRef(false);
	const startX = useRef(0);
	const startScrollLeft = useRef(0);
	const moved = useRef(false);

	// Состояния для стрелок
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	// Проверка границ скролла
	const updateScrollIndicators = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 1);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, []);

	// Перехват клика после драга
	const handleClickCapture = useCallback((e: MouseEvent) => {
		if (moved.current) {
			e.stopPropagation();
			e.preventDefault();
			moved.current = false;
		}
	}, []);

	const handleMouseDown = useCallback((e: MouseEvent) => {
		const slider = ref.current;
		if (!slider || !slider.contains(e.target as Node)) return;
		dragging.current = true;
		moved.current = false;
		startX.current = e.pageX;
		startScrollLeft.current = slider.scrollLeft;
		slider.style.cursor = 'grabbing';
		slider.style.userSelect = 'none';
		e.preventDefault();
	}, []);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!dragging.current) return;
			const slider = ref.current;
			if (!slider) return;
			const dx = e.pageX - startX.current;
			if (!moved.current && Math.abs(dx) < dragThreshold) return;
			moved.current = true;
			slider.scrollLeft = startScrollLeft.current - dx * speed;
		},
		[speed, dragThreshold]
	);

	const handleMouseUp = useCallback(() => {
		const slider = ref.current;
		dragging.current = false;
		if (slider) {
			slider.style.cursor = 'grab';
			slider.style.userSelect = '';
		}
		if (moved.current) {
			setTimeout(() => {
				moved.current = false;
			}, 0);
		}
	}, []);

	// Основной эффект: события мыши + отслеживание скролла/размера
	useEffect(() => {
		const slider = ref.current;
		if (!slider) return;

		// Drag-события
		slider.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		slider.addEventListener('click', handleClickCapture, true);

		// Индикаторы
		updateScrollIndicators();
		slider.addEventListener('scroll', updateScrollIndicators, { passive: true });
		const observer = new ResizeObserver(updateScrollIndicators);
		observer.observe(slider);

		return () => {
			slider.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			slider.removeEventListener('click', handleClickCapture, true);
			slider.removeEventListener('scroll', updateScrollIndicators);
			observer.disconnect();
		};
	}, [handleMouseDown, handleMouseMove, handleMouseUp, handleClickCapture, updateScrollIndicators]);

	return { ref, canScrollLeft, canScrollRight };
}