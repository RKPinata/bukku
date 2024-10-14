import { Button } from "@components/ui/button"
import { columns } from "./columns"
import { DataTable } from "./DataTable"
import useGetPaginatedTransactionsSWR from "../../hooks/useGetPaginatedTransactionsSWR"
import useTransactionsStore from "../../store/TransactionsStore"

type AddNewTransactionProps = {
  transactionType: "purchase" | "sale"
}

const PaginatedTransactionTable: React.FC<AddNewTransactionProps> = ({
  transactionType,
}) => {
  const currentPage = useTransactionsStore((state) => state.currentPage)
  const setCurrentPage = useTransactionsStore((state) => state.setCurrentPage)

  const { data, isValidating } = useGetPaginatedTransactionsSWR(
    transactionType,
    currentPage
  )

  const transactions = data?.data
  const totalPages = data?.pageInfo?.totalPages

  const disablePrev = currentPage <= 1
  const disableNext = !totalPages || currentPage >= totalPages || isValidating

  return (
    <div>
      <DataTable columns={columns} data={transactions || []}></DataTable>
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={disablePrev}
          variant="default"
          className="mx-2"
        >
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={disableNext}
          variant="default"
          className="mx-2"
        >
          {"Next"}
        </Button>
      </div>
    </div>
  )
}

export { PaginatedTransactionTable }
