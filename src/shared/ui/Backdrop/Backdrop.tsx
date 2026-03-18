// shared/ui/Backdrop/Backdrop.tsx
'use client';

import { cn } from '@/shared/lib/utils';

interface BackdropProps {
	open: boolean;
	onClick?: () => void;
	className?: string;
}

export function Backdrop({ open, onClick, className }: BackdropProps) {
	if (!open) return null;
	return (
		<div
			className={cn(
				'fixed inset-0 z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs',
				className
			)}
			onClick={onClick}
			aria-hidden="true"
		/>
	);
}