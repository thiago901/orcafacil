import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createEstimateRequestMessageSchema = z.object({
  company_id: z.string(),
  content: z.string(),
  estimate_request_id: z.string(),
  sender: z.enum(['COMPANY', 'CLIENT']),
  type: z.string(),
});

export class CreateEstimateRequestMessageProps extends createZodDto(
  createEstimateRequestMessageSchema,
) {}
