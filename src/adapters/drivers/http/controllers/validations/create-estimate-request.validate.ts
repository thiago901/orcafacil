import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createEstimateRequestSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  footage: z.number().positive(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  user_id: z.string().optional(),
});

export class CreateEstimateRequestProps extends createZodDto(
  createEstimateRequestSchema,
) {}
