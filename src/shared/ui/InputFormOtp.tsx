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
import { cn } from "@/shared/lib/utils"

type InputFormOtpProps = {
	name: string;
	label?: string;
	hideLabelOnDesktop?: boolean;
	maxLength?: number;            // по умолчанию 6
	disabled?: boolean;
	className?: string;
	containerClassName?: string;   // специфичный для InputOTP (стили контейнера)
	autoFocus?: boolean;
	hideLabel?: boolean;
};

export function InputFormOtp({
	name,
	label,
	hideLabelOnDesktop,
	hideLabel,
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
					<div className='flex flex-col max-w-fit mx-auto gap-3'>
						<FieldLabel
							htmlFor={`form-${name}`}
							className={cn(
								hideLabelOnDesktop ? 'md:hidden' : undefined,
								hideLabel ? 'hidden' : undefined,
							)}
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
											<InputOTPSlot key={index} index={index} className='border-cust-gray p-6 text-lg' />
										)}
									/>
								</InputOTPGroup>
							</InputOTP>

						</div>

						<div className="min-h-5 px-5">
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</div>

					</div>
				</Field>
			)}
		/>
	);
}