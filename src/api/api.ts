import type {
  ApiError,
  ApiResponse,
  CreateTransactionPayload,
  InventorySummary,
  PaginatedResponse,
  Purchase,
  Sale,
} from "@lib/types"
import { calculateNewWAC } from "@lib/utils"
import supabase from "@src/db/supabase"

const getInventorySummary = async (): Promise<
  ApiResponse<InventorySummary>
> => {
  try {
    const { data: inventorySummary, error } = await supabase
      .from("inventory_summary")
      .select("*")
      .eq("id", 1)
      .single()

    if (error) {
      throw error
    }

    return {
      data: inventorySummary,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    }
  }
}

const getLatestTransaction = async (): Promise<
  ApiResponse<Purchase | Sale>
> => {
  try {
    // Call the Supabase RPC function to get the latest transaction
    const { data, error } = await supabase
      .rpc("get_latest_transaction")
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!data) {
      // No data found
      return { data: null, error: null }
    }

    if (data.transaction_type === "purchase") {
      return { data: data as Purchase, error: null }
    } else {
      return { data: data as Sale, error: null }
    }
  } catch (error) {
    return {
      data: null,
      error: error as ApiError,
    }
  }
}

const getPaginatedTransactions = async (
  transactionType: "sale" | "purchase",
  page: number
): Promise<PaginatedResponse<Sale | Purchase>> => {
  const pageSize = 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    // Fetch total count of transactions for the given type
    const { count, error: countError } = await supabase
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .eq("transaction_type", transactionType)

    if (countError || count === null) {
      throw countError
    }

    const totalPages = Math.ceil(count / pageSize)

    // Fetch the actual data for the current page
    const { data, error: dataError } = await supabase
      .from("transactions")
      .select("*")
      .eq("transaction_type", transactionType)
      .order("date", { ascending: true })
      .range(from, to) // Pagination logic

    if (dataError || !data) {
      throw dataError
    }

    return {
      pageInfo: {
        totalPages,
        currentPage: page,
        totalItems: count,
      },
      data: data as (Sale | Purchase)[],
      error: null,
    }
  } catch (error) {
    return {
      pageInfo: null,
      data: null,
      error: error as ApiError,
    }
  }
}

/**
 *
 * @param createPurchaseDTO
 * @description
 * 1. Get current inventory summary to calculate new WAC after purchase
 * 2. Call rpc to update transactions table and inventory summary table
 * 3. Return the new purchase transaction
 * - If there is an error, return null and the error
 * - If a transaction already exists on a date, the db will throw exception (unique constrain)
 */
const createNewPurchase = async (
  createPurchasePayload: CreateTransactionPayload
): Promise<ApiResponse<Purchase>> => {
  try {
    const inventorySummaryRes = await getInventorySummary()

    if (inventorySummaryRes.error || !inventorySummaryRes.data) {
      throw inventorySummaryRes.error
    }

    const {
      total_quantity: currentTotalQuantity,
      total_value: currentTotalValue,
    } = inventorySummaryRes.data

    const { date, quantity, unitPrice } = createPurchasePayload

    const newWac = calculateNewWAC({
      currentTotalQuantity,
      currentTotalValue,
      purchaseQuantity: quantity,
      purchaseUnitPrice: unitPrice,
    })

    // Call the purchase RPC to create new purchase and update inventory summary
    const { data, error } = await supabase
      .rpc("create_purchase_transaction", {
        trans_date: date,
        purchase_quantity: quantity,
        purchase_unit_price: unitPrice,
        new_wac: newWac,
      })
      .single()

    if (error || !data) {
      throw error
    }

    return {
      data: data as Purchase,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error as ApiError | Error,
    }
  }
}

/**
 *
 * @param createSalePayload
 * @description
 * 1. Get current inventory summary to get current total quantity and total value
 * 2. Call rpc to update transactions table and inventory summary table after sale
 * 3. Return the new sale transaction
 * - If there is an error, return null and the error
 */
const createNewSale = async (
  createSalePayload: CreateTransactionPayload
): Promise<ApiResponse<Sale>> => {
  try {
    const inventorySummaryRes = await getInventorySummary()

    if (inventorySummaryRes.error || !inventorySummaryRes.data) {
      throw inventorySummaryRes.error
    }

    const {
      total_quantity: currentTotalQuantity,
      total_value: currentTotalValue,
    } = inventorySummaryRes.data

    const { date, quantity, unitPrice } = createSalePayload

    const newTotalQuantity = currentTotalQuantity - quantity
    const newTotalValue = currentTotalValue - quantity * unitPrice

    if (newTotalQuantity < 0) {
      throw Error("Insufficient quantity in inventory")
    }

    const { data, error } = await supabase
      .rpc("create_sale_transaction", {
        trans_date: date,
        sale_quantity: quantity,
        sale_unit_price: unitPrice,
        new_total_quantity: newTotalQuantity,
        new_total_value: newTotalValue,
      })
      .single()

    if (error || !data) {
      throw error
    }

    return {
      data: data as Sale,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error as ApiError | Error,
    }
  }
}

export {
  createNewPurchase,
  createNewSale,
  getInventorySummary,
  getLatestTransaction,
  getPaginatedTransactions,
}
