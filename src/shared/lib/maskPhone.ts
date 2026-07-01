export function maskPhone(phoneNumber: string | null | undefined): string {
	const digits = phoneNumber?.replace(/\D/g, '') || '';
	return digits.length < 4 ? 'Пользователь' : `*${digits.slice(-4, -2)}-${digits.slice(-2)}`;
}  