'use client';

import { useMediaQuery } from '@/shared/lib';
import { Button, Icon } from '@/shared/ui';

export function CallbackDialogButton() {
	const isDesktop = useMediaQuery('(min-width: 768px)');
	return (
		isDesktop ? (
			<Button variant={'primary'} size={'pill-50-bold-accent'} className={'min-w-57'}>
				Заказать звонок
			</Button>
		) : (
			<Button
				className={'w-full px-2.5'}
				variant={"primary"}
				size={"full-40-primary-shadow"}
			>
				<div className="flex gap-2.5">
					<Icon name="chevronDuoDownIcon" className="size-5" />
					<div>Мы вам перезвоним</div>
				</div>
			</Button>
		)
	);
}