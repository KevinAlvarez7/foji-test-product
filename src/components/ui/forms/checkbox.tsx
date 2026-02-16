import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer shrink-0 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5 rounded-sm",
        default: "h-4 w-4 rounded-sm",
        lg: "h-5 w-5 rounded",
      },
      colorScheme: {
        default:
          "border-primary data-[state=checked]:bg-primary",
        destructive:
          "border-destructive data-[state=checked]:bg-destructive",
        success:
          "border-green-600 data-[state=checked]:bg-green-600",
        neutral:
          "border-muted-foreground data-[state=checked]:bg-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      colorScheme: "default",
    },
  }
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  label?: string
  description?: string
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      colorScheme,
      label,
      description,
      checked,
      onCheckedChange,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="flex items-start gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={checked}
          onChange={handleChange}
          data-state={checked ? "checked" : "unchecked"}
          className={cn(checkboxVariants({ size, colorScheme }), className)}
          {...props}
        />
        {(label || description) && (
          <div className="grid gap-0.5 leading-none">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }
