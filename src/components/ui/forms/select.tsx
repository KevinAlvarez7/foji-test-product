import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex w-full items-center justify-between rounded-md border bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        default: "border-input",
        error: "border-destructive focus:ring-destructive",
        success: "border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const selectOptionVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "py-1 pl-6 pr-2 text-xs",
        default: "py-1.5 pl-8 pr-2 text-sm",
        lg: "py-2 pl-10 pr-3 text-base",
      },
      highlighted: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      highlighted: false,
    },
  }
)

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  options: SelectOption[]
  placeholder?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, variant, options, placeholder, error, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            selectVariants({ size, variant: error ? "error" : variant }),
            "appearance-none",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select, selectVariants, selectOptionVariants }
