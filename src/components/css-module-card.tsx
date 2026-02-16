import * as React from "react"
import styles from "./css-module-card.module.css"

interface CssModuleCardProps {
  title: string
  description?: string
  variant?: "default" | "outlined" | "elevated"
  children?: React.ReactNode
}

export function CssModuleCard({
  title,
  description,
  variant = "default",
  children,
}: CssModuleCardProps) {
  const variantClass = {
    default: styles.default,
    outlined: styles.outlined,
    elevated: styles.elevated,
  }[variant]

  return (
    <div className={`${styles.card} ${variantClass}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  )
}
