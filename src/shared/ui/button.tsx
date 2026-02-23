import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[filter] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 leading-none",
	//убрал дефолтные: rounded-md text-sm font-medium gap-2 transition-all focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-4 
	{
		variants: {
			variant: {
				// default: "bg-primary text-primary-foreground hover:bg-primary/90",
				// destructive:
				// 	"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				// outline:
				// 	"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				// secondary:
				// 	"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				// ghost:
				// 	"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				// link: "text-primary underline-offset-4 hover:underline",
				//кастомные варианты
				pillPrimary50: 'bg-primary text-white rounded-full font-accent px-4 py-4.5 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-108',

				pillPrimary50ShGreen: 'bg-primary text-white rounded-full font-accent px-4 py-4.75 text-[12px] font-bold tracking-[0.05em] uppercase hover:brightness-108 shadow-btn-green',
				pillPrimary40ShGreen: 'bg-primary text-white rounded-full font-accent px-4 py-3.5 text-[12px] font-bold tracking-[0.05em] uppercase hover:brightness-108 shadow-btn-green',

				pillPrimary46ShGrey: 'bg-primary text-white rounded-full font-accent px-4 py-4 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-108 shadow-btn-grey',

				rectPrimary33: 'bg-primary text-white rounded-[5px] font-sans px-4 py-2.5 text-[13px] font-bold hover:brightness-108',
				rectSecondary33: 'bg-secondary text-[#7C7C7C] rounded-[5px] font-sans px-4 py-2.5 text-[13px] hover:brightness-92',
				rectWhite30: 'bg-white text-[#4F4F4F] rounded-[5px] font-accent px-4 py-2 text-[14px] tracking-[0.05em] hover:brightness-92',

				pillOutline50: 'border-2 border-primary bg-white text-[#4F4F4F] rounded-full font-accent px-4 py-4 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-92',
				pillOutline40: 'border-2 border-primary bg-white text-[#4F4F4F] rounded-full font-sans px-4 py-2.75 text-[14px] hover:brightness-92',
				pillOutline36: 'border-2 border-primary bg-white text-[#4F4F4F] rounded-full font-sans px-4 py-2.5 text-[12px] hover:brightness-92',

				square40: 'min-w-10 min-h-10 bg-white text-[#333333] rounded-[5px] font-sans px-0.25 py-0.25 text-[13px] hover:brightness-92 shadow-btn-pagination',
				square27: 'min-w-6.75 min-h-6.75 bg-white text-[#333333] rounded-[5px] font-sans px-0.25 py-0.25 text-[13px] hover:brightness-92',

				pillSecondary30lg: 'bg-secondary text-[#4F4F4F] rounded-full font-sans px-4 py-2 text-[14px] hover:brightness-92',
				pillSecondary30: 'bg-secondary text-[#4F4F4F] rounded-full font-sans px-4 pb-2.25 pt-2 text-[13px] hover:brightness-92',
				pillSecondary25: 'bg-secondary text-[#4F4F4F] rounded-full font-sans px-4 pb-1.75 pt-1.5 text-[12px] hover:brightness-92',

				fullWidthPrimary40: 'gap-2.5 min-h-10 bg-primary text-white rounded-none font-accent px-4 py-2 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-108 shadow-black-10',
				fullWidthPrimary50RadBottom: 'gap-2.5 min-h-12.5 rounded-b-[5px] bg-primary text-white font-sans px-4 py-2 text-[14px] hover:brightness-108',
				fullWidthLink40: 'justify-start gap-2.5 min-h-10 bg-transparent text-primary rounded-none font-sans pr-4 py-2 text-[14px] font-bold hover:brightness-108',
				fullWidthPrimary36Card: 'justify-between gap-2.5 min-h-9 bg-primary text-white rounded-b-[5px] font-accent px-5 py-2 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-108',
				fullWidthPrimary50RadAll: 'justify-between gap-2.5 min-h-12.5 bg-primary text-white rounded-[5px] font-sans px-3.75 py-2 text-[14px] font-bold tracking-[0.05em] uppercase hover:brightness-108',

				iconOutline50: 'border border-border bg-white text-primary rounded-full size-12.5 hover:brightness-92',
				iconOutline40: 'border border-border bg-white text-primary rounded-full size-10 hover:brightness-92',
				iconOutline40bw: 'border border-border bg-white text-[#323232] rounded-full size-10 hover:brightness-92',
				iconOutline29: 'border border-border bg-white text-primary rounded-full size-7.25 hover:brightness-92',

				iconPrimary50: 'bg-primary text-white rounded-full size-12.5 hover:brightness-108',
				iconPrimary46: 'bg-primary text-white rounded-full size-11.5 hover:brightness-108',
				iconPrimary25: 'bg-primary text-white rounded-full size-6.25 hover:brightness-108',

				ghost: 'hover:brightness-92',
			},
			size: {
				default: "",
				normal: "h-9 px-4 py-2 has-[>svg]:px-3", //переименованный оригинальный default
				xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "pillPrimary50",
			size: "default",
		},
	}
)

function Button({
	className,
	variant = "pillPrimary50",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot.Root : "button"

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
