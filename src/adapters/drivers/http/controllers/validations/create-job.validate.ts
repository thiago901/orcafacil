import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createJobSchema = z.object({
  company_id: z.string().uuid(),
  proposal_id: z.string().uuid(),
  estimate_request_id: z.string().uuid(),
  estimate_id: z.string().uuid(),
  customer_id: z.string().uuid(),
});

export class CreateJobProps extends createZodDto(createJobSchema) {}
