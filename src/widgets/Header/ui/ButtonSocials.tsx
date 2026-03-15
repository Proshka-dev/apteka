'use client'
import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Button, Icon, IconName } from '@/shared/ui';

interface ButtonSocialsProps {
	href: string;
	iconName: IconName;
	iconSize?: number;
	className?: string;
}

export function ButtonSocials({
	href,
	className,
	iconName,
	iconSize = 3.5,
}: ButtonSocialsProps) {
	return (
		<Button variant={'icon-outline'} size={'icon-29'} nativeButton={false} render={(buttonProps) => (
			<Link
				href={href}
				{...buttonProps}
				className={cn(buttonProps.className, className)}
			>
				<Icon name={iconName} className={`text-cust-mint size-${String(iconSize)}`} />
			</Link>
		)}>
		</Button>

	);
}