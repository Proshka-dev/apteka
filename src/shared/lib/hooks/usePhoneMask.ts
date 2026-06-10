import { useMask } from '@react-input/mask';
import { useCallback } from 'react';
import type { RefCallBack } from 'react-hook-form';

export function usePhoneMask(rhfRef: RefCallBack) {
	const maskRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ },
	});

	const ref = useCallback(
		(node: HTMLInputElement | null) => {
			// Обходим ограничение readonly свойства .current через быстрое приведение типа
			(maskRef as { current: HTMLInputElement | null }).current = node;

			// Передаем узел (включая null при размонтировании) в React Hook Form
			rhfRef(node);
		},
		[rhfRef] // maskRef исключен, так как его ссылка стабильна всегда
	);

	return ref;
}