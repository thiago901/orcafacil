import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateJobSchema = z.object({
  finished_company_at: z.coerce.date().optional(),
  finished_customer_at: z.coerce.date().optional(),
});

export class UpdateJobProps extends createZodDto(updateJobSchema) {}
