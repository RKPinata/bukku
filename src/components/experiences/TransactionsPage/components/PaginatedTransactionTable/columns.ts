import { Purchase, Sale } from "@lib/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Sale | Purchase>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
  },
  {
    id: "totalValue",
    header: "Total Value",
    cell: ({ row }) => {
      const quantity = row.original.quantity
      const unitPrice = row.original.unit_price
      return (quantity * unitPrice).toFixed(2)
    },
  },
]

