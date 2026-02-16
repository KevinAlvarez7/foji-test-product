import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const animatedCardVariants = cva(
  "relative overflow-hidden rounded-xl border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border shadow-sm",
        elevated: "border-transparent shadow-lg",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-xl shadow-xl",
        gradient:
          "border-transparent bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AnimatedCardProps
  extends Omit<HTMLMotionProps<"div">, "variant">,
    VariantProps<typeof animatedCardVariants> {
  hoverEffect?: "lift" | "glow" | "scale" | "none"
}

const hoverAnimations = {
  lift: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
    whileTap: { y: 0 },
  },
  glow: {
    whileHover: {
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 },
    },
  },
  scale: {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 },
  },
  none: {},
} as const

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, variant, size, hoverEffect = "lift", children, ...props }, ref) => {
    const animation = hoverAnimations[hoverEffect]

    return (
      <motion.div
        ref={ref}
        className={cn(animatedCardVariants({ variant, size }), className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        {...animation}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard, animatedCardVariants }
