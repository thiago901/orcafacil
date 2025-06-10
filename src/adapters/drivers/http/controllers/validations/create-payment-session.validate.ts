import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createPaymentSessionSchema = z.object({
  customer_id: z.string(),
  price_id: z.string(),
});

export class CreatePaymentSessionProps extends createZodDto(
  createPaymentSessionSchema,
) {}
