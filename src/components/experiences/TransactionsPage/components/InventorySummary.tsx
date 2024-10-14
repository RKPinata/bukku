import { getInventorySummary } from "@src/api"
import { Typography } from "@components/typography/Typography"
import useSWR from "swr"

const InventorySummary: React.FC = () => {
  const { data: inventorySummaryRes, isLoading: isInventorySummaryLoading } =
    useSWR("getInventorySummary", getInventorySummary)

  // Assuming you have these values from your data
  const currentWAC = inventorySummaryRes?.data?.current_wac || 0
  const totalQuantity = inventorySummaryRes?.data?.total_quantity || 0
  const totalValue = inventorySummaryRes?.data?.total_value || 0

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between items-center gap-4">
      <div>
        <Typography
          as="h2"
          size="text-2xl"
          color="primary"
          className="font-bold"
        >
          Inventory Summary
        </Typography>
      </div>
      <div className="flex space-x-8">
        <div className="text-center">
          <Typography
            as="p"
            size="text-lg"
            color="primary"
            className="font-semibold"
          >
            {currentWAC.toFixed(2)}
          </Typography>
          <Typography as="p" size="text-sm" color="secondary-foreground">
            Current WAC
          </Typography>
        </div>
        <div className="text-center">
          <Typography
            as="p"
            size="text-lg"
            color="primary"
            className="font-semibold"
          >
            {totalQuantity}
          </Typography>
          <Typography as="p" size="text-sm" color="secondary-foreground">
            Total Quantity
          </Typography>
        </div>
        <div className="text-center">
          <Typography
            as="p"
            size="text-lg"
            color="primary"
            className="font-semibold"
          >
            ${totalValue.toFixed(2)}
          </Typography>
          <Typography as="p" size="text-sm" color="secondary-foreground">
            Total Value
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default InventorySummary
