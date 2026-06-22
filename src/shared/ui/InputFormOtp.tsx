// shared/ui/form-otp-input.tsx
'use client';

import { Controller, useFormContext } from 'react-hook-form';
import {
	Field,
	FieldError,
	FieldLabel,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	Repeat,
} from '@/shared/ui';

type InputFormOtpProps = {
	name: string;
	label: string;
	hideLabelOnDesktop?: boolean;
	maxLength?: number;            // по умолчанию 6
	disabled?: boolean;
	className?: string;
	containerClassName?: string;   // специфичный для InputOTP (стили контейнера)
	autoFocus?: boolean;
};

export function InputFormOtp({
	name,
	label,
	hideLabelOnDesktop,
	maxLength = 6,
	...restProps
}: InputFormOtpProps) {
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
					<div className='flex justify-center'>
						<InputOTP
							{...field}
							maxLength={maxLength}
							{...restProps}
							id={`form-${name}`}
							aria-invalid={fieldState.invalid}
						>
							<InputOTPGroup>
								<Repeat
									times={maxLength}
									render={(index) => (
										<InputOTPSlot key={index} index={index} className='border-cust-gray' />
									)}
								/>
							</InputOTPGroup>
						</InputOTP>

					</div>

					<div className="min-h-5 px-5">
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</div>
				</Field>
			)}
		/>
	);
}