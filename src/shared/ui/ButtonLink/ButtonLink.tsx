'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { Button, type ButtonProps } from '@/shared/ui';

interface ButtonLinkProps extends Omit<ButtonProps, 'href'> {
	href: LinkProps['href'];
	linkProps?: Omit<LinkProps, 'href'>; 	// Дополнительные пропсы для Link
}

/**
 * Универсальная кнопка-ссылка.
 * Использует Button из shadcn/ui (на Base UI) и Next.js Link.
 * Все пропсы Button (variant, size, className и т.д.) передаются в Button.
 * Дополнительные пропсы для Link указываются в linkProps.
 */


export function ButtonLink({
	href,
	linkProps,
	children,
	...buttonProps
}: ButtonLinkProps) {
	return (
		<Button
			nativeButton={false}
			{...buttonProps}
			render={(renderProps) => (
				<Link href={href} {...linkProps} {...renderProps}>
					{children}
				</Link>
			)}
		/>
	);
}

