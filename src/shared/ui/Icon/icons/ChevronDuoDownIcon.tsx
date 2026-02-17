import { SVGProps } from 'react';
import { cn } from '@/shared/lib/utils';

export const ChevronDuoDownIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={cn('inline-block', className)}
		{...props}
	>
		<path
			d="M10 15.3539L4.99133 10.3453L6.16984 9.16676L10 12.9969L13.8302 9.16676L15.0087 10.3453L10 15.3539Z"
			fill="currentColor"
		/>
		<path
			d="M10 10.8334L4.99133 5.82475L6.16984 4.64624L10 8.4764L13.8302 4.64624L15.0087 5.82475L10 10.8334Z"
			fill="currentColor"
		/>
	</svg>
);

