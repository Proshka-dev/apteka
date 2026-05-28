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
	iconPosition?: 'left' | 'right';
}

export function ButtonTopNav({
	children,
	href,
	className,
	iconName,
	iconPosition = 'right',
}: ButtonTopNavProps) {
	return (
		<Button variant={'ghost-custom'} nativeButton={false} render={(buttonProps) => (
			<Link
				href={href}
				{...buttonProps}
				className={cn(
					buttonProps.className,
					className,
					`${iconPosition === 'left' && 'flex-row-reverse'}`,
				)}
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