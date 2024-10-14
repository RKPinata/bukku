import type { PostgrestError } from "@supabase/supabase-js"
import type { Database } from "./supabase.types"
import { CreateTransactionPayloadSchema } from "@lib/validation/transactions.schema"
import { z } from "zod"

export type ApiResponse<T> = {
  data: T | null
  error: ApiError
}

export type PaginatedResponse<T> = {
  pageInfo: {
    totalPages: number
    currentPage: number
    totalItems: number
  } | null
  data: T[] | null
  error: ApiError
}

export type ApiError = Error | PostgrestError | null

export type CreateTransactionPayload = z.infer<
  typeof CreateTransactionPayloadSchema
>

export type Transaction<T extends "purchase" | "sale"> = {
  id: number
  date: string
  quantity: number
  transaction_type: T
  unit_price: number
}

export type Purchase = Transaction<"purchase">
export type Sale = Transaction<"sale">

export type InventorySummary =
  Database["public"]["Tables"]["inventory_summary"]["Row"]
