'use client'
import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
	const getSnapshot = () => window.matchMedia(query).matches;

	const subscribe = (callback: () => void) => {
		const mediaQueryList = window.matchMedia(query);
		mediaQueryList.addEventListener('change', callback);
		return () => mediaQueryList.removeEventListener('change', callback);
	};

	// Для SSR возвращаем значение по умолчанию (false) – можно адаптировать
	const getServerSnapshot = () => false;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}