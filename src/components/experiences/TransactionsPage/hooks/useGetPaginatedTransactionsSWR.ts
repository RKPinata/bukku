import { getPaginatedTransactions } from "@src/api"
import useSWR from "swr"

const useGetPaginatedTransactionsSWR = (
  transactionType: "sale" | "purchase",
  page: number
) => {
  const fetcher = async () => {
    const response = await getPaginatedTransactions(transactionType, page)
    return response
  }

  const key = ["getPaginatedTransactions", transactionType, page]

  return useSWR(key, fetcher)
}

export default useGetPaginatedTransactionsSWR
