import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserPaymentCustomerSchema = z.object({
  doc: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
});

export class CreateUserPaymentCustomerProps extends createZodDto(
  createUserPaymentCustomerSchema,
) {}
