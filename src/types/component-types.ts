export type Size = "xs" | "sm" | "md" | "lg" | "xl"

export type ColorScheme =
  | "neutral"
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "info"

export type Alignment = "left" | "center" | "right"

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface VariantComponentProps<V extends string = string> extends BaseComponentProps {
  variant?: V
  size?: Size
}

export type PropsWithAs<T extends React.ElementType, P = object> = P & {
  as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, keyof P | "as">
