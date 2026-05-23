'use client'

// hooks/useDragScroll.ts
// hooks/useDragScrollSimple.ts
import { useRef, useEffect, useCallback } from 'react';

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
	const moved = useRef(false); // было ли реальное перемещение

	// Перехватываем click на фазе захвата и отменяем, если был драг
	const handleClickCapture = useCallback((e: MouseEvent) => {
		if (moved.current) {
			e.stopPropagation();
			e.preventDefault();
			// Сразу сбрасываем, чтобы не влиять на следующие клики
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
		e.preventDefault(); // предотвращает выделение текста, но НЕ отменяет click
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
		// Если было движение, даём шанс перехватить click
		if (moved.current) {
			// Сбрасываем moved асинхронно, чтобы click-обработчик успел проверить флаг
			setTimeout(() => { moved.current = false; }, 0);
		}
	}, []);

	// Вешаем обработчики
	useEffect(() => {
		const slider = ref.current;
		if (!slider) return;

		slider.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		// Перехват клика в фазе захвата
		slider.addEventListener('click', handleClickCapture, true);

		return () => {
			slider.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			slider.removeEventListener('click', handleClickCapture, true);
		};
	}, [handleMouseDown, handleMouseMove, handleMouseUp, handleClickCapture]);

	return { ref };
}