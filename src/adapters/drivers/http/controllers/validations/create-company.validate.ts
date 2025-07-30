import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(2),
  owner_id: z.string(),
  avatar: z.string().optional(),
  about: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  address: z.object({
    name: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(2),
    address: z.string().min(2),
  }),
  categories: z
    .array(
      z.object({
        name: z.string(),
        category_id: z.string(),
        category_name: z.string(),
      }),
    )
    .min(1),
});

export class CreateCompanyProps extends createZodDto(createCompanySchema) {}
