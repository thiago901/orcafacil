import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserPaymentSessionSchema = z.object({
  customer_id: z.string(),
  amount: z.number(),
});

export class CreateUserPaymentSessionProps extends createZodDto(
  createUserPaymentSessionSchema,
) {}
