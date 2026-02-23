import React from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

type IconType = string | React.ReactNode;

const renderIcon = (
	icon: IconType | undefined,
	defaultClassName: string,
	rotate = false
) => {
	if (!icon) return null;

	const className = cn(
		defaultClassName,
		rotate && 'rotate-180 transition-transform duration-300'
	);

	if (typeof icon === 'string') {
		return <Icon name={'menu'} className={className} />;
	}

	if (React.isValidElement(icon)) {
		const element = icon as React.ReactElement<{ className?: string }>;
		return React.cloneElement(element, {
			className: cn(element.props.className, className),
		});
	}

	return null;
};

interface NavButtonProps {
	children: React.ReactNode;
	iconLeft: IconType;
	iconRight?: IconType;
	onClick?: () => void;
	isOpen?: boolean;
	rotateRightIconOnOpen?: boolean;
	className?: string;
	iconLeftClassName?: string;
	iconRightClassName?: string;
}

interface NavLinkProps {
	children: React.ReactNode;
	href: string;
	iconRight: IconType;
	className?: string;
	iconRightClassName?: string;
}

export function NavButton({
	children,
	iconLeft,
	iconRight,
	onClick,
	isOpen = false,
	rotateRightIconOnOpen = false,
	className,
	iconLeftClassName,
	iconRightClassName,
}: NavButtonProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'inline-flex items-center whitespace-nowrap cursor-pointer bg-transparent border-none p-0',
				className
			)}
			type="button"
		>
			{renderIcon(iconLeft, cn('text-cust-mint mr-2.5', iconLeftClassName))}
			<span className="text-cust-grayblue text-sm font-medium font-accent">
				{children}
			</span>
			{iconRight &&
				renderIcon(
					iconRight,
					cn('text-cust-gray', iconRightClassName),
					rotateRightIconOnOpen && isOpen
				)}
		</button>
	);
}

export function NavLink({
	children,
	href,
	iconRight,
	className,
	iconRightClassName,
}: NavLinkProps) {
	return (
		<Link
			href={href}
			className={cn('inline-flex items-center whitespace-nowrap', className)}
		>
			<span className="text-cust-grayblue text-sm font-medium font-accent mr-2.5">
				{children}
			</span>
			{renderIcon(iconRight, cn('text-cust-mint', iconRightClassName))}
		</Link>
	);
}