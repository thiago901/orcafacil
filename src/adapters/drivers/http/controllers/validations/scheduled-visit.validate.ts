import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createScheduledVisitSchema = z.object({
  estimate_request_id: z.string().uuid(),
  company_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  scheduled_at: z.coerce.date(),
  notes: z.string().optional(),
});

export class CreateScheduledVisitDto extends createZodDto(
  createScheduledVisitSchema,
) {}
