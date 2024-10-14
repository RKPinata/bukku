import { z } from "zod"

// const CreateTransactionPayloadSchema = z.object({
//   date: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format yyyy-mm-dd"),
//   quantity: z.coerce
//     .number({ required_error: "Quantity is required" })
//     .int("Quantity must be an integer")
//     .gt(0, "Quantity must be greater than 0"),
//   unitPrice: z.coerce
//     .number({ required_error: "Unit price is required" })
//     .min(0, "Unit price must be greater than or equal to 0")
//     .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
//       message: "Unit price must have at most two decimal places",
//     }),
// })

const CreateTransactionPayloadSchema = z.object({
  date: z
    .string()
    .nonempty("Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format yyyy-MM-dd"),
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .gt(0, "Quantity must be greater than 0")
  ),
  unitPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Unit price is required" })
      .min(0, "Unit price must be greater than or equal to 0")
      .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
        message: "Unit price must have at most two decimal places",
      })
  ),
})


export { CreateTransactionPayloadSchema }
