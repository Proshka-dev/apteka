// shared/lib/isTempEmail.ts
export function isTempEmail(email?: string | null): boolean {
	if (!email) return false;
	return email.endsWith('@temp.user');
}  