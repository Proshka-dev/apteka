// components/contact-button.tsx
import { Mail, Phone } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface ButtonContactProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	/** Тип контакта: email или phone */
	type?: 'email' | 'phone';
	/** Значение контакта (email или номер телефона) */
	value: string;
	/** Текст под иконкой (по умолчанию "Напишите нам" для email, "Позвоните нам" для phone) */
	subtitle?: string;
	/** Кастомная иконка (24x24) */
	icon?: React.ReactNode;
}

export function ButtonContact({
	type = 'email',
	value,
	subtitle = type === 'email' ? 'Напишите нам' : 'Позвоните нам',
	icon,
	className,
	...props
}: ButtonContactProps) {
	// Формируем правильный href для email или телефона
	const href = type === 'email' ? `mailto:${value}` : `tel:${value}`;

	// Иконка по умолчанию в зависимости от типа
	const defaultIcon = type === 'email'
		? <Mail className="w-6 h-6 text-[#2FD3AE]" />
		: <Phone className="w-6 h-6 text-[#2FD3AE]" />;

	return (
		<Button
			variant="ghost"
			// className теперь будет автоматически передан в элемент render (если компонент Button поддерживает мерж)
			className={cn("p-0 h-auto", className)}
			nativeButton={false}
			render={
				<a
					href={href}
					className="flex items-center gap-5 px-4 py-2" // базовые стили ссылки
					{...props}
				/>
			}
		>
			{icon || defaultIcon}
			<div className="flex flex-col items-start">
				<span className="uppercase text-lg leading-[27px]">{value}</span>
				<span className="text-[11px] leading-none">{subtitle}</span>
			</div>
		</Button>
	);
}