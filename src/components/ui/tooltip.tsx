import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden border shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default:
          "bg-popover text-popover-foreground border-border",
        dark:
          "bg-gray-900 text-gray-50 border-gray-800",
        light:
          "bg-white text-gray-900 border-gray-200 shadow-lg",
        accent:
          "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive/50",
      },
      size: {
        sm: "rounded-md px-2.5 py-1 text-xs",
        default: "rounded-md px-3 py-1.5 text-sm",
        lg: "rounded-lg px-4 py-2 text-base",
      },
      interactive: {
        true: "pointer-events-auto cursor-default hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.98]",
        false: "pointer-events-none",
      },
    },
    compoundVariants: [
      {
        variant: "dark",
        interactive: true,
        className: "hover:bg-gray-800 focus:ring-gray-500",
      },
      {
        variant: "destructive",
        interactive: true,
        className: "hover:bg-destructive/90 focus:ring-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>
>(({ className, variant, size, interactive, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size, interactive }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipContentVariants,
}
