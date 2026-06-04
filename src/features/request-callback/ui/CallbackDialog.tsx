'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/lib';
import { Button, Icon, Sheet, SheetContent, SheetTrigger } from '@/shared/ui';
import Link from 'next/link';
import { CallbackDialogContent } from './CallbackDialogContent';

export function CallbackDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);


	return (
		<div className='flex md:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger render={
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
				}
				/>
				<SheetContent side="top" className='md:hidden p-5 gap-5' showCloseButton>
					<CallbackDialogContent setOpen={setOpen} />
				</SheetContent>
			</Sheet>
		</div>
	);
}