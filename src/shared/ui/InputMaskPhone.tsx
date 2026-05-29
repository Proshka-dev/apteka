// shared/ui/InputMaskPhone.tsx
'use client';

import { InputMask, type InputMaskProps } from '@react-input/mask';
import { Input } from '@/shared/ui';
import React from 'react';

interface InputMaskPhoneProps extends Omit<InputMaskProps, 'onChange' | 'value'> {
	error?: boolean;
	className?: string;
	value?: string;               // чистое значение (только цифры)
	onChange?: (digits: string) => void;
}

// Функция превращает чистые цифры в формат +7 (xxx) xxx-xx-xx
function formatPhone(digits: string): string {
	const cleaned = digits.replace(/\D/g, '');       // на всякий случай
	let formatted = '+7 (';
	if (cleaned.length > 0) formatted += cleaned.substring(0, 3);
	if (cleaned.length >= 4) formatted += ') ' + cleaned.substring(3, 6);
	if (cleaned.length >= 7) formatted += '-' + cleaned.substring(6, 8);
	if (cleaned.length >= 9) formatted += '-' + cleaned.substring(8, 10);
	// Остаток маски будет заполнен InputMask самостоятельно
	return formatted;
}

export function InputMaskPhone({
	className,
	error,
	value = '',
	onChange,
	...props
}: InputMaskPhoneProps) {
	// Преобразуем чистое значение в формат маски
	const formattedValue = formatPhone(value);

	return (
		<InputMask
			mask="+7 (___) ___-__-__"
			replacement={{ _: /\d/ }}
			component={Input}
			className={className}
			value={formattedValue}   // ← теперь InputMask получает готовую строку
			{...props}
			onChange={(event) => {
				const raw = event.target.value;
				const digits = raw.replace(/\D/g, '');
				onChange?.(digits);
			}}
		/>
	);
}