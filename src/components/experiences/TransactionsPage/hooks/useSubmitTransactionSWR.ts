import type {
  ApiResponse,
  CreateTransactionPayload,
  Purchase,
  Sale,
} from "@lib/types"
import { createNewPurchase, createNewSale } from "@root/src/api"
import { CreateTransactionPayloadSchema } from "@lib/validation/transactions.schema"
import type { MutationFetcher } from "swr/mutation"
import useSWRMutation from "swr/mutation"
import { mutate } from "swr"
import { toast } from "sonner"
import useTransactionsStore from "../store/TransactionsStore"


const useSubmitTransactionSWR = () => {
  const transactiontype = useTransactionsStore((state) => state.transactionType)
  const currentPage = useTransactionsStore((state) => state.currentPage)

  const purchaseMutation: MutationFetcher<
    ApiResponse<Purchase>, // Res
    string, // Key
    CreateTransactionPayload // Args
  > = async (key, { arg: createTransactionPayload }) => {
    const validatedPayload = CreateTransactionPayloadSchema.parse(
      createTransactionPayload
    )

    const response = await createNewPurchase(validatedPayload)
    if (response.error) {
      throw response.error
    }
    return response
  }

  const saleMutation: MutationFetcher<
    ApiResponse<Sale>, // Res
    string, // Key
    CreateTransactionPayload // Args
  > = async (key, { arg: createTransactionPayload }) => {
    const validatedPayload = CreateTransactionPayloadSchema.parse(
      createTransactionPayload
    )

    const response = await createNewSale(validatedPayload)
    if (response.error) {
      throw response.error
    }
    return response
  }

  const { trigger: submitNewPurchase, isMutating: isPurchaseSubmitting } =
    useSWRMutation("createNewPurchase", purchaseMutation, {
      onSuccess: () => {
        toast.success("PURCHASE added successfully")
        mutate("getLatestTransaction")
        mutate(["getPaginatedTransactions", transactiontype, currentPage])
      },
      onError: (error) => {
        toast.error("Failed to add SALE")
      },
    })

  const { trigger: submitNewSale, isMutating: isSaleSubmitting } =
    useSWRMutation("createNewSale", saleMutation, {
      onSuccess: () => {
        toast.success("SALE added successfully")
        mutate("getLatestTransaction")
        mutate(["getPaginatedTransactions", transactiontype, currentPage])
      },
      onError: (error) => {
        toast.error("Failed to add PURCHASE")
      },
    })

  const isSubmitting = isPurchaseSubmitting || isSaleSubmitting

  return {
    isSubmitting,
    submitNewPurchase,
    submitNewSale,
  }
}

export { useSubmitTransactionSWR }
