import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findCompanyLocationSchema = z.object({
  categories: z.string().array(),
  address: z.object({
    street: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(2),
    state: z.string().min(2),
    postal_code: z.string().min(2),
  }),
});

export class FindCompanyLocationProps extends createZodDto(
  findCompanyLocationSchema,
) {}
