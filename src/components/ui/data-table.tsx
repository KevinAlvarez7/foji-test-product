import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableCellVariants = cva(
  "border-b transition-colors",
  {
    variants: {
      density: {
        compact: "px-2 py-1 text-xs",
        comfortable: "px-4 py-2 text-sm",
        spacious: "px-6 py-4 text-base",
      },
      alignment: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      density: "comfortable",
      alignment: "left",
    },
  }
)

const tableHeaderVariants = cva(
  "border-b font-medium text-muted-foreground",
  {
    variants: {
      density: {
        compact: "px-2 py-1.5 text-xs",
        comfortable: "px-4 py-3 text-sm",
        spacious: "px-6 py-4 text-base",
      },
      sticky: {
        true: "sticky top-0 z-10 bg-background",
        false: "",
      },
    },
    defaultVariants: {
      density: "comfortable",
      sticky: false,
    },
  }
)

interface Column<T> {
  key: keyof T & string
  header: string
  sortable?: boolean
  alignment?: "left" | "center" | "right"
}

export interface DataTableProps<T extends Record<string, unknown>>
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableCellVariants> {
  data: T[]
  columns: Column<T>[]
  stickyHeader?: boolean
  onRowClick?: (row: T, index: number) => void
  emptyMessage?: string
}

function DataTable<T extends Record<string, unknown>>({
  className,
  density,
  data,
  columns,
  stickyHeader = false,
  onRowClick,
  emptyMessage = "No data available",
  ...props
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null)

  const handleSort = React.useCallback((key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }, [sortKey])

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal === bVal) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [data, sortKey, sortDirection])

  const handleRowClick = React.useCallback(
    (row: T, index: number) => {
      setSelectedRow(index)
      onRowClick?.(row, index)
    },
    [onRowClick]
  )

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom", className)} {...props}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  tableHeaderVariants({
                    density,
                    sticky: stickyHeader,
                  }),
                  column.alignment && `text-${column.alignment}`,
                  column.sortable && "cursor-pointer select-none hover:text-foreground"
                )}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {column.header}
                  {column.sortable && sortKey === column.key && (
                    <span aria-hidden="true">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "transition-colors hover:bg-muted/50",
                selectedRow === rowIndex && "bg-muted",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => handleRowClick(row, rowIndex)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    tableCellVariants({
                      density,
                      alignment: column.alignment,
                    })
                  )}
                >
                  {String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable, tableCellVariants, tableHeaderVariants }
