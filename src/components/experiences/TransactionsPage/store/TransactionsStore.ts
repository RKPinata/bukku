import { create } from "zustand"

interface TransactionsStore {
  transactionType: "purchase" | "sale"
  currentPage: number
  setCurrentPage: (page: number) => void
  setTransactionType: (transactionType: "purchase" | "sale") => void
}

const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactionType: "purchase",
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTransactionType: (transactionType) => set({ transactionType }),
}))

export default useTransactionsStore
