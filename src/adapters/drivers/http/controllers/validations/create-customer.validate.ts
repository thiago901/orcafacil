import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCustomerSchema = z.object({
  email: z.string().email(),
});

export class CreateCustomerProps extends createZodDto(createCustomerSchema) {}
