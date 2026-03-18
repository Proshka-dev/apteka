// features/search/hooks/useSearchSuggestions.ts
import { useDebounce } from '@/shared/lib';
import { useState, useEffect } from 'react';

export interface Suggestion {
	id: string;
	name: string;
	slug: string;
}

export function useSearchSuggestions(query: string, delay = 300) {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(false);
	const debouncedQuery = useDebounce(query, delay);

	useEffect(() => {
		if (!debouncedQuery.trim()) {
			setSuggestions([]);
			return;
		}

		const fetchSuggestions = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(debouncedQuery)}`);
				if (!res.ok) throw new Error();
				const data = await res.json();
				setSuggestions(data.items || []);
			} catch {
				setSuggestions([]);
			} finally {
				setLoading(false);
			}
		};

		fetchSuggestions();
	}, [debouncedQuery]);

	return { suggestions, loading, debouncedQuery };
}