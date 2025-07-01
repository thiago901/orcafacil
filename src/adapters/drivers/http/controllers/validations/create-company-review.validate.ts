import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCompanyReviewSchema = z.object({
  title: z.string(),
  comment: z.string().optional(),
  job_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
});

export class CreateCompanyReviewProps extends createZodDto(
  createCompanyReviewSchema,
) {}
