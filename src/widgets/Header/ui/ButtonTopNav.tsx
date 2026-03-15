'use client'
import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Button, Icon, IconName } from '@/shared/ui';

interface ButtonTopNavProps {
	children: React.ReactNode;
	href: string;
	iconName: IconName;
	className?: string;
}

export function ButtonTopNav({
	children,
	href,
	className,
	iconName,
}: ButtonTopNavProps) {
	return (
		<Button variant={'ghost-custom'} nativeButton={false} render={(buttonProps) => (
			// inline-flex items-center whitespace-nowrap УБРАТЬ, если будет работать без них
			<Link
				href={href}
				{...buttonProps}
				className={cn(buttonProps.className, className)}
			>
				<span className="text-cust-grayblue text-sm font-medium font-accent mr-2.5">
					{children}
				</span>
				<Icon name={iconName} className='text-cust-mint size-6' />
			</Link>
		)}>
		</Button>

	);
}