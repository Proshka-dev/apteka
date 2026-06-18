'use client';

import { Controller, useFormContext, type Control } from 'react-hook-form';
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui';

type InputFormTextProps = {
	name: string;
	label: string;
	placeholder?: string;
	hideLabelOnDesktop?: boolean;
	maxLength?: number;
};

export function InputFormText({ name, label, placeholder, hideLabelOnDesktop, maxLength }: InputFormTextProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={`form-${name}`} className={hideLabelOnDesktop ? 'md:hidden' : undefined}>
						{label}
					</FieldLabel>
					<Input
						{...field}
						id={`form-${name}`}
						aria-invalid={fieldState.invalid}
						placeholder={placeholder}
						maxLength={maxLength}
					/>
					<div className="min-h-5 px-5">
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</div>
				</Field>
			)}
		/>
	);
}