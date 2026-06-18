// shared/ui/form-phone-input.tsx
'use client';

import { Controller, useFormContext, type Control } from 'react-hook-form';
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui';
import { usePhoneMask } from '../lib';

type InputFormPhoneProps = {
	name: string;
	label: string;
	placeholder?: string;
	hideLabelOnDesktop?: boolean;
	disabled?: boolean;
};

export function InputFormPhone({ name, label, placeholder, hideLabelOnDesktop, disabled }: InputFormPhoneProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const ref = usePhoneMask(field.ref);

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={`form-${name}`} className={hideLabelOnDesktop ? 'md:hidden' : undefined}>
							{label}
						</FieldLabel>
						<Input
							{...field}
							ref={ref}
							id={`form-${name}`}
							aria-invalid={fieldState.invalid}
							placeholder={placeholder}
							disabled={disabled}
						/>
						<div className="min-h-5 px-5">
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</div>
					</Field>
				);
			}}
		/>
	);
}