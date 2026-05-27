'use client'
import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Button, Icon, IconName } from '@/shared/ui';

interface ButtonCategoryProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	iconName: IconName;
	iconSize?: number;
	className?: string;
	children: React.ReactNode;
}

export function ButtonCategory({
	href,
	className,
	iconName,
	iconSize = 5,
	children,
}: ButtonCategoryProps) {
	return (
		<Button variant={'ghost-custom'} size={'default'} nativeButton={false} render={(props) => (
			<Link
				href={href}
				{...props}
				className={cn(props.className, className)}
			>
				<div className='flex gap-3.75 items-center'>
					<Icon name={iconName} className={`text-white size-${iconSize}`} />
					<div className="text-white text-xs sm:text-sm md:text-sm font-bold font-accent tracking-[0.05em] uppercase">
						{/* <span className="text-white text-xs lg:text-sm font-bolf font-accent tracking-[0.05em]"> */}
						{children}
					</div>
				</div>
			</Link>
		)}>
		</Button>

	);
}