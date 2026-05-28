'use client'

import { useMediaQuery } from "@/shared/lib";
import { Button, Icon, Input, Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from "@/shared/ui";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CallbackDialog() {


	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)'); // md брейкпоинт

	useEffect(() => {
		if (isDesktop) {
			setOpen(false);
		}
	}, [isDesktop]);

	return (
		<div className='flex md:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger
					render={
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
				<SheetContent
					side="top"
					className={'md:hidden p-5 gap-5'}

					showCloseButton={true}
				>
					<div className="font-bold text-lg font-accent">
						Мы вам перезвоним
					</div>
					<div className="mb-10.75 font-sans text-cust-gray">
						Оставьте ваши данные и мы свяжемся с вами. Мы не занимаемся рассылкой рекламных сообщений, а так же не передаем контактные данные третьим лицам
					</div>
					<div className="flex flex-col gap-5 mb-21.5">
						<Input placeholder="Ваше имя" />
						<Input placeholder="Телефон" />
					</div>

					<div className="font-sans text-xs text-cust-gray">
						<span>
							{'Нажимая на кнопку, вы соглашаетесь на обработку '}
						</span>
						<SheetClose>
							<Link href={'/personal'} className="text-cust-mint">
								персональных данных
							</Link>
						</SheetClose>
					</div>
					<Button
						variant={"primary"}
						size={"pill-50-bold-accent"}
					>
						Перезвоните мне
					</Button>
				</SheetContent>
			</Sheet>
		</div>
	)
}
