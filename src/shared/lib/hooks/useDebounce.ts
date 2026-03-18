'use client'

import { useState, useEffect } from 'react';

/**
 * Хук для отложенного обновления значения.
 * @param value Значение, которое нужно дебаунсить
 * @param delay Задержка в миллисекундах
 * @returns Отложенное значение
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}