// features/search/ui/SuggestionsList/SuggestionsList.tsx
'use client';

import { cn } from '@/shared/lib';
import type { Suggestion } from '../hooks/useSearchSuggestions';

interface SuggestionsListProps {
	suggestions: Suggestion[];
	loading: boolean;
	query: string;
	onSuggestionClick: (slug: string) => void;
	className?: string;
}

export function SuggestionsList({
	suggestions,
	loading,
	query,
	onSuggestionClick,
	className,
}: SuggestionsListProps) {
	if (loading) {
		return (
			<div className={cn('p-3 text-center text-sm text-muted-foreground', className)}>
				Загрузка...
			</div>
		);
	}

	if (suggestions.length > 0) {
		return (
			<div className={cn('max-h-60 overflow-auto', className)}>
				{suggestions.map((item) => (
					<div
						key={item.id}
						className="p-3 hover:bg-muted cursor-pointer transition-colors"
						onClick={() => onSuggestionClick(item.slug)}
					>
						{item.name}
					</div>
				))}
			</div>
		);
	}

	if (query.trim()) {
		return (
			<div className={cn('p-3 text-center text-sm text-muted-foreground', className)}>
				Ничего не найдено
			</div>
		);
	}

	return null;
}