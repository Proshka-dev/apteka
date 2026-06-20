// shared/ui/form-phone-input.tsx
'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui';
import { usePhoneMask } from '../lib';
import type { ComponentProps } from 'react';

type InputFormPhoneProps = Omit<ComponentProps<typeof Input>, 'ref' | 'id'> & {
	name: string;
	label: string;
	hideLabelOnDesktop?: boolean;
};

export function InputFormPhone({ name, label, hideLabelOnDesktop, ...restProps }: InputFormPhoneProps) {
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
							{...restProps}
							ref={ref}
							id={`form-${name}`}
							aria-invalid={fieldState.invalid}
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