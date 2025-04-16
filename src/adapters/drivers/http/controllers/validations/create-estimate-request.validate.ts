import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createEstimateRequestSchema = z.object({
  name: z.string().min(2),
  owner_id: z.string(),
  avatar: z.string().optional(),
  user_id: z.string(),
  description: z.string(),
  email: z.string().email(),
  footage: z.number().positive(),
  phone: z.string().min(10).max(15),
});

export class CreateEstimateRequestProps extends createZodDto(
  createEstimateRequestSchema,
) {}
