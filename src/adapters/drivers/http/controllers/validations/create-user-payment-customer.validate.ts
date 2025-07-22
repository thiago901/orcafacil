import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserPaymentCustomerSchema = z.object({
  doc: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  customer_id: z.string().uuid(),
});

export class CreateUserPaymentCustomerProps extends createZodDto(
  createUserPaymentCustomerSchema,
) {}
