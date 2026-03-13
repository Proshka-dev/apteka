'use client'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Icon, ScrollArea } from "@/shared/ui";


export function DevDialogs() {
	return (
		<div className="p-4">
			<Dialog>
				<DialogTrigger className={'cursor-pointer font-bold border p-2'}>Открыть диалоговое окно</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Вы уверены?</DialogTitle>
						<DialogDescription>
							<div className="h-50 w-50 border-amber-700 border">
								<ScrollArea className="h-full">
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
									<div>Текст</div>
								</ScrollArea>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

		</div>
	);
}