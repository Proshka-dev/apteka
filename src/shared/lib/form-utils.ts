// shared/lib/form-utils.ts
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export function setServerErrors<T extends FieldValues>(
	form: UseFormReturn<T>,
	errors: Record<string, string[] | undefined>
) {
	Object.entries(errors).forEach(([field, messages]) => {
		if (messages?.length) {
			form.setError(field as Path<T>, {
				type: 'server',
				message: messages[0],
			});
		}
	});
}