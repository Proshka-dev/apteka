"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

// ===== Оригинальная базовая строка из shadcn (копируется при обновлении) =====
const shadcnBaseClasses =
	"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none"

// ===== Наши дополнительные базовые классы =====
const customBaseClasses = "cursor-pointer leading-none"

// ===== Оригинальные варианты из shadcn (копируются при обновлении) =====
const shadcnVariants = {
	variant: {
		default: "bg-primary text-primary-foreground hover:bg-primary/80",
		// outline:
		// 	"border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
		// secondary:
		// 	"bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
		ghost:
			"hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
		// destructive:
		// 	"bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
		// link: "text-primary underline-offset-4 hover:underline",
	},
	size: {
		default:
			"h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
		// xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
		// sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
		// lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
		// icon: "size-9",
		// "icon-xs":
		// 	"size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
		// "icon-sm":
		// 	"size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
		// "icon-lg": "size-10",
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
} as const

// ===== Наши кастомные варианты (уникальные имена, чтобы не конфликтовать) =====
const customVariants = {
	variant: {
		primary: "bg-primary text-white hover:brightness-108",
		"primary-green-shadow": "bg-primary text-white hover:brightness-108 shadow-btn-green",
		"primary-grey-shadow": "bg-primary text-white hover:brightness-108 shadow-btn-grey",
		"primary-black-shadow": "bg-primary text-white hover:brightness-108 shadow-black-10",
		"primary-outline": "border-2 border-primary bg-white text-[#4F4F4F] hover:brightness-92",
		grey: "bg-secondary text-[#4F4F4F] hover:brightness-92",
		white: "bg-white text-[#333333] hover:brightness-92 shadow-btn-pagination",
		"icon-outline": "border border-border bg-white text-primary hover:brightness-92",
		"icon-outline-bw": "border border-border bg-white text-[#323232] hover:brightness-92",
		"icon-primary": "bg-primary text-white hover:brightness-108",
		"text-link": "bg-transparent text-primary hover:brightness-108",
		"ghost-custom": "hover:brightness-92",
	},
	size: {
		// Пилюли
		"pill-50-bold-accent": "h-12.5 px-4 py-4.5 text-sm font-accent font-bold tracking-[0.05em] uppercase rounded-full",
		"pill-46-bold-accent": "h-11.5 px-4 py-4 text-sm font-accent font-bold tracking-[0.05em] uppercase rounded-full",
		"pill-40-bold-accent": "h-10 px-4 py-3.5 text-xs font-accent font-bold tracking-[0.05em] uppercase rounded-full",
		"pill-40-sans": "h-10 px-4 py-2.75 text-sm font-sans rounded-full",
		"pill-36-sans": "h-9 px-4 py-2.5 text-xs font-sans rounded-full",
		"pill-30-sans": "h-7.5 px-4 py-2 text-xs font-sans rounded-full",
		"pill-30-sans-medium": "h-7.5 px-4 pt-2 pb-2.25 text-xs font-sans rounded-full",
		"pill-25-sans": "h-6.25 px-4 pt-1.5 pb-1.75 text-xs font-sans rounded-full",
		// Прямоугольные
		"rect-33-bold-sans": "h-8.25 px-4 py-2.5 text-sm font-sans font-bold rounded-[5px]",
		"rect-33-sans": "h-8.25 px-4 py-2.5 text-sm font-sans rounded-[5px]",
		"rect-30-accent": "h-7.5 px-4 py-2 text-sm font-accent rounded-[5px]",
		// Квадратные
		"square-40-sans": "min-w-10 min-h-10 px-0.25 py-0.25 text-sm font-sans rounded-[5px]",
		"square-27-sans": "min-w-6.75 min-h-6.75 px-0.25 py-0.25 text-sm font-sans rounded-[5px]",
		// Иконки
		"icon-50": "size-12.5 rounded-full",
		"icon-46": "size-11.5 rounded-full",
		"icon-40": "size-10 rounded-full",
		"icon-29": "size-7.25 rounded-full",
		"icon-25": "size-6.25 rounded-full",
		// FullWidth
		"full-40-primary-shadow": "min-h-10 gap-2.5 px-4 py-2 text-[14px] font-accent font-bold tracking-[0.05em] uppercase rounded-none",
		"full-50-bottom-sans": "min-h-12.5 gap-2.5 px-4 py-2 text-[14px] font-sans rounded-b-[5px]",
		"full-40-link": "justify-start gap-2.5 min-h-10 pr-4 py-2 text-[14px] font-sans font-bold rounded-none",
		"full-36-card-accent": "justify-between gap-2.5 min-h-9 px-5 py-2 text-[14px] font-accent font-bold tracking-[0.05em] uppercase rounded-b-[5px]",
		"full-50-all-sans-bold": "justify-between gap-2.5 min-h-12.5 px-3.75 py-2 text-[14px] font-sans font-bold tracking-[0.05em] uppercase rounded-[5px]",
	},
} as const

// ===== Объединённые варианты =====
const buttonVariants = cva(shadcnBaseClasses + " " + customBaseClasses, {
	variants: {
		variant: {
			...shadcnVariants.variant,
			...customVariants.variant,
		},
		size: {
			...shadcnVariants.size,
			...customVariants.size,
		},
	},
	defaultVariants: shadcnVariants.defaultVariants,
})

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }