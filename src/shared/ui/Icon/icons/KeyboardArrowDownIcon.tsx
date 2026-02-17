import { SVGProps } from 'react';
import { cn } from '@/shared/lib/utils';

export const KeyboardArrowDownIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={cn('inline-block', className)}
		{...props}
	>
		<g clipPath="url(#clip0_7411_5421)">
			<path d="M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z" fill="#828282" />
		</g>
		<defs>
			<clipPath id="clip0_7411_5421">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
);