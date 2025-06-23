import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProposalSchema = z.object({
  description: z.string(),
  company_id: z.string(),
  customer: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    document: z.string(),
  }),

  items: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      unit: z.string(),
      price: z.coerce.number(),
      quantity: z.coerce.number(),
    }),
  ),

  estimate_request_id: z.string(),
  expire_at: z.coerce.date(),
});

export class CreateProposalProps extends createZodDto(createProposalSchema) {}
