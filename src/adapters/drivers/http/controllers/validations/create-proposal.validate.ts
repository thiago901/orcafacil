import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProposalSchema = z.object({
  name: z.string(),
  amount: z.number(),
  company_id: z.string(),
  description: z.string(),
  estimate_request_id: z.string(),
});

export class CreateProposalProps extends createZodDto(createProposalSchema) {}
