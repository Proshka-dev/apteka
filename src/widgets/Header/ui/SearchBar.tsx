'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Popover,
	PopoverBackdrop,
	PopoverBackdropAlt,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui';
import { Button, Icon } from '@/shared/ui';
import { useSearchSuggestions } from '@/features/search/hooks/useSearchSuggestions';
import { cn } from '@/shared/lib/utils';
import { SuggestionsList } from '@/features/search/ui/SuggestionsList/SuggestionsList';

interface SearchBarProps {
	className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const router = useRouter();

	const { suggestions, loading, debouncedQuery } = useSearchSuggestions(query);

	const handleSearch = () => {
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query)}`);
			setOpen(false);
		}
	};

	const handleSuggestionClick = (slug: string) => {
		router.push(`/products/${slug}`);
		setOpen(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSearch();
	};

	return (
		<div className={cn('relative', className)}>
			<Popover
				open={open}
				onOpenChange={setOpen}
				modal={false} // отключаем модальное поведение – фокус остаётся на триггере
			>
				{/* Встроенный бэкдроп с размытием */}
				{/* <PopoverBackdrop onClick={() => setOpen(false)} /> */}
				<PopoverBackdropAlt
					// className="pointer-events-auto cursor-default"
					onClick={() => setOpen(false)}
				/>

				{/* 
         			ВАЖНО: Оборачиваем триггер в div с z-index выше, чем у Backdrop (z-50),
         			чтобы инпут оставался визуально над блюром и был доступен для клика.
      			*/}
				<div className="relative z-[60]">
					<PopoverTrigger
						// 1. Отключаем стандартный клик, чтобы он не "крал" фокус у инпута

						nativeButton={false}
						render={(triggerProps) => (
							<InputGroup className="bg-white">
								<InputGroupInput
									{...triggerProps}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Поиск..."

								// Переопределяем onClick, чтобы он не мешал фокусу
								// onClick={(e) => {
								// 	e.currentTarget.focus()
								// 	setOpen(true)
								// }}
								// Открываем при фокусе (например, при переходе через Tab)
								// onFocus={() => setOpen(true)}
								/>
								<InputGroupAddon>
									<Button
										size="icon-40"
										variant="ghost"
										onClick={handleSearch}
										aria-label="Поиск"
									>
										<Icon name="search" className="h-5 w-5" />
									</Button>
								</InputGroupAddon>
							</InputGroup>
						)}
					/>

				</div>

				<PopoverContent
					className="w-[var(--popover-trigger-width)] p-0 mt-5"
					align="start"
					sideOffset={0}
					initialFocus={false}
				>
					{/* 
			           Добавляем Backdrop прямо сюда. 
           				Он отрендерится внутри Portal, но не будет привязан к позиции инпута.
        			*/}
					{/* <PopoverBackdropAlt /> */}

					<div>Найденные товары:</div>
					<SuggestionsList
						suggestions={suggestions}
						loading={loading}
						query={debouncedQuery}
						onSuggestionClick={handleSuggestionClick}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}