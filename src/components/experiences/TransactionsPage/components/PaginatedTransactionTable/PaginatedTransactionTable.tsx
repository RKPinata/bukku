import type { Purchase, Sale } from "@root/src/lib/types"
import { columns } from "./columns"
import { DataTable } from "./DataTable"
import useSWR from "swr"
import useGetPaginatedTransactionsSWR from "../../hooks/useGetPaginatedTransactionsSWR"

type AddNewTransactionProps = {
  transactionType: "purchase" | "sale"
}

const PaginatedTransactionTable: React.FC<AddNewTransactionProps> = ({
  transactionType,
}) => {
  const { data, isValidating, isLoading } = useGetPaginatedTransactionsSWR(
    transactionType,
    1
  )

  const pageInfo = data?.pageInfo
  const transactions = data?.data

  console.log(data)

  return (
    <div>
      <DataTable columns={columns} data={transactions || []}></DataTable>
    </div>
  )
}

export { PaginatedTransactionTable }
