import { addDays, format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTransactionPayload } from "@lib/types"
import { CreateTransactionPayloadSchema } from "@lib/validation/transactions.schema"
import { cn } from "@root/src/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Calendar } from "@components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { useSubmitTransactionSWR } from "../hooks/useSubmitTransactionSWR"
import { LoadingSpinner } from "@root/src/components/ui/spinner"

type AddNewTransactionProps = {
  transactionType: "purchase" | "sale"
  latestTransactionDate: Date | null
  isLoading: boolean
}

const AddNewTransaction: React.FC<AddNewTransactionProps> = ({
  transactionType,
  latestTransactionDate,
  isLoading,
}) => {
  const defaultDate = latestTransactionDate
    ? addDays(latestTransactionDate, 1)
    : undefined

  const form = useForm<CreateTransactionPayload>({
    mode: "onChange",
    resolver: zodResolver(CreateTransactionPayloadSchema),
    defaultValues: {
      date: defaultDate ? format(defaultDate, "yyyy-MM-dd") : "",
      quantity: 1,
      unitPrice: 0,
    },
  })

  const handleCreateTransactionSubmit = (payload: CreateTransactionPayload) => {
    if (transactionType === "purchase") {
      submitNewPurchase(payload)
    } else {
      submitNewSale(payload)
    }

    const newDefaultDate = format(
      addDays(new Date(payload.date), 1),
      "yyyy-MM-dd"
    )

    form.reset({
      date: newDefaultDate,
      quantity: payload.quantity,
      unitPrice: payload.unitPrice,
    })
  }

  const { submitNewPurchase, submitNewSale, isSubmitting } =
    useSubmitTransactionSWR()

  const buttonText = `+ ${transactionType === "purchase" ? "Purchase" : "Sale"}`
  const submitText = `Add New ${
    transactionType === "purchase" ? "Purchase" : "Sale"
  }`

  return (
    <Dialog>
      <DialogTrigger asChild disabled={isSubmitting || isLoading}>
        <Button variant={"outline"} size={"sm"}>
          {isSubmitting || isLoading ? <LoadingSpinner /> : buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTransactionSubmit)}
            className="space-y-4"
          >
            {/* Unit Price Field */}
            <FormField
              name="unitPrice"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      onKeyDown={(e) => {
                        if (["-", "e", "+"].includes(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity Field */}
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="1"
                      min="1"
                      step="1"
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      onKeyDown={(e) => {
                        if (["-", "e", "+", "."].includes(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                const dateValue = new Date(field.value)

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(dateValue, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateValue ? dateValue : undefined}
                          onSelect={(selectedDate) => {
                            if (selectedDate) {
                              const formattedDate = format(
                                selectedDate,
                                "yyyy-MM-dd"
                              )
                              field.onChange(formattedDate)
                            }
                          }}
                          disabled={(date) =>
                            latestTransactionDate === null
                              ? false
                              : date < latestTransactionDate
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <DialogClose asChild disabled={!form.formState.isValid}>
              <Button type="submit">{submitText}</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { AddNewTransaction }
