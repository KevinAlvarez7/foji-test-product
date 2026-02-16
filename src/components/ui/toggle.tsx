import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-muted-foreground",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        solid:
          "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        xs: "h-7 px-1.5 text-xs",
        sm: "h-9 px-2.5 text-sm",
        default: "h-10 px-3 text-sm",
        lg: "h-11 px-5 text-base",
      },
      shape: {
        rounded: "rounded-md",
        square: "rounded-none",
        pill: "rounded-full",
      },
      state: {
        active:
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        inactive: "",
      },
      colorScheme: {
        neutral: "",
        primary:
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        destructive:
          "data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",
        success:
          "data-[state=on]:bg-green-500 data-[state=on]:text-white",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        state: "active",
        className: "data-[state=on]:border-accent",
      },
      {
        variant: "solid",
        colorScheme: "primary",
        className: "data-[state=on]:shadow-md",
      },
      {
        variant: "solid",
        colorScheme: "destructive",
        className: "data-[state=on]:shadow-md data-[state=on]:shadow-destructive/20",
      },
      {
        size: "xs",
        shape: "pill",
        className: "px-2.5",
      },
      {
        size: "lg",
        shape: "pill",
        className: "px-6",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
      state: "active",
      colorScheme: "neutral",
    },
  }
)

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      state,
      colorScheme,
      pressed = false,
      onPressedChange,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(pressed)

    React.useEffect(() => {
      setIsPressed(pressed)
    }, [pressed])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !isPressed
      setIsPressed(next)
      onPressedChange?.(next)
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        className={cn(
          toggleVariants({ variant, size, shape, state, colorScheme }),
          className
        )}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
