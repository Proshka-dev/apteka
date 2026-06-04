'use client';

import { useMask } from '@react-input/mask';
import { forwardRef } from 'react';
import { Input } from './input';

interface MaskedInputProps {
	mask: string;
	replacement: string | Record<string, RegExp>;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	className?: string;
	// любые другие пропсы, которые принимает ваш Input
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	({ mask, replacement, ...props }, forwardedRef) => {
		const inputRef = useMask({ mask, replacement });

		// Совмещаем forwardedRef и ref от useMask
		const combinedRef = (element: HTMLInputElement) => {
			inputRef.current = element;
			if (typeof forwardedRef === 'function') {
				forwardedRef(element);
			} else if (forwardedRef) {
				forwardedRef.current = element;
			}
		};

		return <Input ref={combinedRef} {...props} />;
	}
);

MaskedInput.displayName = 'MaskedInput';