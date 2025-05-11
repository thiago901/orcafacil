import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createEstimateRequestSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  footage: z.number().positive(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  user_id: z.string().optional(),
  address_city: z.string(),
  address_neighborhood: z.string(),
  address_number: z.string(),
  address_postal_code: z.string(),
  address_state: z.string(),
  address_street: z.string(),
  lat: z.string(),
  long: z.string(),
});

export class CreateEstimateRequestProps extends createZodDto(
  createEstimateRequestSchema,
) {}
