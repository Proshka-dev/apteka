// shared/ui/form-text-input.tsx
'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui';
import type { ComponentProps } from 'react';

type InputFormTextProps = Omit<ComponentProps<typeof Input>, 'ref' | 'id'> & {
	name: string;
	label: string;
	hideLabelOnDesktop?: boolean;
};

export function InputFormText({ name, label, hideLabelOnDesktop, ...restProps }: InputFormTextProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel
						htmlFor={`form-${name}`}
						className={hideLabelOnDesktop ? 'md:hidden' : undefined}
					>
						{label}
					</FieldLabel>
					<Input
						{...field}
						{...restProps}
						id={`form-${name}`}
						aria-invalid={fieldState.invalid}
					/>
					<div className="min-h-5 px-5">
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</div>
				</Field>
			)}
		/>
	);
}