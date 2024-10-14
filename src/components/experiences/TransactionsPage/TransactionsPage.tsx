import useSWR from "swr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { getInventorySummary, getLatestTransaction } from "@root/src/api"
import { AddNewTransaction } from "./components/AddNewTransaction"

import { PaginatedTransactionTable } from "./components/PaginatedTransactionTable/PaginatedTransactionTable"
import useTransactionsStore from "./store/TransactionsStore"
import InventorySummary from "./components/InventorySummary"

const TransactionsPage: React.FC = () => {
  const transactiontypes = useTransactionsStore(
    (state) => state.transactionType
  )
  const setTransactionType = useTransactionsStore(
    (state) => state.setTransactionType
  )

  const {
    data: latestTransactionRes,
    isLoading: isLatestTransactionLoading,
    isValidating: isLatestTransactionValidating,
  } = useSWR("getLatestTransaction", getLatestTransaction, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  })

  const latestTransaction = latestTransactionRes?.data?.date
    ? new Date(latestTransactionRes.data.date)
    : undefined

  if (isLatestTransactionLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-3 flex-grow">
      <InventorySummary />
      <div className="flex items-center justify-between">
        <Tabs
          value={transactiontypes}
          onValueChange={(value) =>
            setTransactionType(value as "purchase" | "sale")
          }
          className="flex"
        >
          <TabsList>
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
            <TabsTrigger value="sale">Sale</TabsTrigger>
          </TabsList>
          <TabsContent value="purchase"></TabsContent>
          <TabsContent value="sale"></TabsContent>
        </Tabs>
        <AddNewTransaction
          transactionType={transactiontypes}
          latestTransactionDate={latestTransaction}
          isLoading={isLatestTransactionValidating}
        />
      </div>
      <PaginatedTransactionTable transactionType={transactiontypes} />
    </div>
  )
}

export { TransactionsPage }
