// components/contact-button.tsx
import { Mail, Phone } from "lucide-react";
import { Button, Icon, IconName } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface ButtonContactProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	type?: 'email' | 'phone';
	value: string;
	subtitle: string;
	iconName: IconName;
}

export function ButtonContact({
	type = 'email',
	value,
	subtitle,
	iconName,
	className,
	...props
}: ButtonContactProps) {
	// Формируем href для email или телефона
	const href = ((type === 'email') ? `mailto:${value}` : `tel:${value}`);

	return (
		<Button
			variant="ghost-custom"
			// className теперь будет автоматически передан в элемент render (если компонент Button поддерживает мерж)
			className={cn("p-0 h-auto", className)}
			nativeButton={false}
			render={
				<Link
					href={href}
					className="flex items-center gap-5 px-4 py-0" // базовые стили ссылки
					{...props}
				/>
			}
		>
			<Icon name={iconName} className="size-6 text-cust-mint" />
			<div className="flex flex-col items-start">
				<span className="uppercase text-lg leading-6.75">{value}</span>
				<span className="text-[11px] leading-none">{subtitle}</span>
			</div>
		</Button>
	);
}