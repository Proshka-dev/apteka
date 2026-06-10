'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/lib';
import { Button, Icon, Sheet, SheetContent, SheetTrigger } from '@/shared/ui';
import Link from 'next/link';
import { CallbackDialogContent } from './CallbackDialogContent';
import { CallbackDialogButton } from './CallbackDialogButton';

export function CallbackDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	// useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);


	return (
		// <div className='flex md:hidden'>
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger render={
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
			}
			/>
			<SheetContent side="top" className='p-5 gap-5 md:max-w-4/5 md:mx-auto md:mt-20 md:p-15 rounded-4xl' showCloseButton>
				{/* md:hidden  */}
				<CallbackDialogContent setOpen={setOpen} />
			</SheetContent>
		</Sheet>
		// </div>
	);
}