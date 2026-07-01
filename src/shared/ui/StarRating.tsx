import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StarRatingProps {
	rating: number;          // от 0 до 5, дробное
	size?: 'sm' | 'md' | 'lg';
	showValue?: boolean;
	className?: string;
}

const sizeMap = {
	sm: 'size-4',
	md: 'size-5',
	lg: 'size-6',
};

function StarIcon({ fill, size }: { fill: number; size: 'sm' | 'md' | 'lg' }) {
	const sizeClass = sizeMap[size];
	const fillPercent = Math.min(1, Math.max(0, fill)) * 100;

	return (
		<div className={cn('relative inline-block', sizeClass)}>
			{/* Пустая звезда (серая) */}
			<Star
				className={cn('absolute inset-0 text-muted-foreground', sizeClass)}
				strokeWidth={1.5}
				fill="none"
			/>
			{/* Заполненная звезда (жёлтая), обрезанная по ширине */}
			<div
				className="absolute inset-0 overflow-hidden"
				style={{ width: `${fillPercent}%` }}
			>
				<Star
					className={cn('text-yellow-400', sizeClass)}
					strokeWidth={1.5}
					fill="currentColor"
				/>
			</div>
		</div>
	);
}

export function StarRating({
	rating,
	size = 'md',
	showValue = false,
	className,
}: StarRatingProps) {
	const stars = Array.from({ length: 5 }, (_, i) => {
		// fill для i-й звезды: rating - i, ограничиваем [0,1]
		return Math.min(1, Math.max(0, rating - i));
	});

	return (
		<div className={cn('flex items-center gap-0.5', className)}>
			{stars.map((fill, i) => (
				<StarIcon key={i} fill={fill} size={size} />
			))}
			{showValue && (
				<span className="ml-1 text-sm text-muted-foreground">
					{rating.toFixed(1)}
				</span>
			)}
		</div>
	);
}