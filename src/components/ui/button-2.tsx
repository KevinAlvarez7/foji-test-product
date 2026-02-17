import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const button2Variants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        variant2: "bg-slate-500 text-gray-900 hover:bg-orange-500",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "variant2",
      size: "sm",
    },
  }
)

export interface Button2Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button2Variants> {}

const Button2 = React.forwardRef<HTMLButtonElement, Button2Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(button2Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button2.displayName = "Button2"

export { Button2, button2Variants }
