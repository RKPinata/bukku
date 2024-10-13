// TODO: unit test this function
const calculateNewWAC = ({
  currentTotalValue,
  currentTotalQuantity,
  purchaseQuantity,
  purchaseUnitPrice,
}: {
  currentTotalValue: number
  currentTotalQuantity: number
  purchaseQuantity: number
  purchaseUnitPrice: number
}) => {
  //WAC = previous_total_value + (new quantity * new price) / previous_total_quantity + new_quantity
  const newTotalValue = currentTotalValue + purchaseQuantity * purchaseUnitPrice
  const newTotalQuantity = currentTotalQuantity + purchaseQuantity

  return newTotalValue / newTotalQuantity
}

export { calculateNewWAC }