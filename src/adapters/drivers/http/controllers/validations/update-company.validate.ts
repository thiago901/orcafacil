import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  about: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  address: z
    .object({
      name: z.string().min(2),
      city: z.string().min(2),
      country: z.string().min(2),
      state: z.string().min(2),
      zip: z.string().min(2),
      address: z.string().min(2),
    })
    .optional(),
});

export class UpdateCompanyProps extends createZodDto(updateCompanySchema) {}
