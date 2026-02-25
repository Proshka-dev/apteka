'use client'
// shared/lib/hooks/useClickOutside.ts
import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Хук для вызова обработчика при клике вне указанных элементов.
 * @param refs - один или массив рефов на элементы, внутри которых клик игнорируется
 * @param handler - функция, вызываемая при клике вне
 */
export function useClickOutside(
	refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
	handler: Handler
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			const targets = Array.isArray(refs) ? refs : [refs];
			// Если клик был внутри хотя бы одного из переданных элементов — ничего не делаем
			if (targets.some(ref => ref.current?.contains(event.target as Node))) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [refs, handler]);
}