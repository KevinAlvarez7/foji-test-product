import * as React from "react"
import { clsx } from "clsx"

import { cn } from "@/lib/utils"

interface DynamicBannerProps {
  type: "info" | "warning" | "error" | "success"
  message: string
  isExpanded?: boolean
  isSticky?: boolean
  onDismiss?: () => void
}

export function DynamicBanner({
  type,
  message,
  isExpanded = false,
  isSticky = false,
  onDismiss,
}: DynamicBannerProps) {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  return (
    <div
      className={cn(
        "w-full px-4 py-3 text-sm font-medium transition-all duration-300",
        type === "info" && "bg-blue-50 text-blue-800 border-blue-200",
        type === "warning" && "bg-yellow-50 text-yellow-800 border-yellow-200",
        type === "error" && "bg-red-50 text-red-800 border-red-200",
        type === "success" && "bg-green-50 text-green-800 border-green-200",
        isExpanded ? "py-6 text-base" : "py-3 text-sm",
        isSticky && "sticky top-0 z-50",
        onDismiss && "pr-10"
      )}
      role="alert"
    >
      <div
        className={clsx(
          "flex items-center gap-2",
          isExpanded && "flex-col text-center gap-3"
        )}
      >
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={() => {
            setVisible(false)
            onDismiss()
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}
