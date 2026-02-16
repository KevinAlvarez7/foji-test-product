import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-base",
        lg: "h-12 w-12 md:h-14 md:w-14 text-lg",
        xl: "h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-xl",
        custom: "h-[42px] w-[42px] text-sm",
      },
      border: {
        none: "",
        thin: "border border-border",
        thick: "border-2 border-border",
        accent: "border-2 border-[#a78bfa]",
        gradient: "ring-2 ring-offset-2 ring-[rgb(168,85,247)]",
      },
      status: {
        none: "",
        online: "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-green-500 after:border-2 after:border-background",
        offline: "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-gray-400 after:border-2 after:border-background",
        busy: "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-[#ef4444] after:border-2 after:border-background",
      },
    },
    defaultVariants: {
      size: "default",
      border: "none",
      status: "none",
    },
  }
)

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full",
  {
    variants: {
      colorScheme: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        warm: "bg-[#fef3c7] text-[#92400e]",
        cool: "bg-[rgb(219,234,254)] text-[rgb(30,64,175)]",
      },
    },
    defaultVariants: {
      colorScheme: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarFallbackVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, border, status, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarVariants({ size, border, status }), className)}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, colorScheme, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarFallbackVariants({ colorScheme }), className)}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarVariants,
  avatarFallbackVariants,
}
