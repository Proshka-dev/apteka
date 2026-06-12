'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/lib';
import { Button, Icon, Sheet, SheetContent, SheetTrigger } from '@/shared/ui';
import { RegisterDialogContent } from './RegisterDialogContent';

export function RegisterDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	// useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);

	// {/* мобильная кнопка */}
	// {/* десктопная кнопка */}
	// 	<Button variant={'primary'} size={'pill-50-bold-accent'} className={'hidden md:inline-flex min-w-57'}>
	// 	Заказать звонок
	// </Button>


	return (
		// <div className='flex md:hidden'>
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger render={
				<Button
					className={'inline-flex md:hidden w-full px-2.5'}
					variant={"primary"}
					size={"full-40-primary-shadow"}
				>
					<div className="flex gap-2.5">
						<Icon name="chevronDuoDownIcon" className="size-5" />
						<div>Мы вам перезвоним</div>
					</div>
				</Button>


			}
			/>
			<SheetContent side="top" className='p-5 gap-5 md:max-w-4/5 md:mx-auto md:mt-20 md:p-15 md:rounded-4xl' showCloseButton>
				<RegisterDialogContent setOpen={setOpen} />
			</SheetContent>
		</Sheet>
		// </div>
	);
}